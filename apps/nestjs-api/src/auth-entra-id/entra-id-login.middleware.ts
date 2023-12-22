import {
  AuthorizationUrlRequest,
  ResponseMode
} from '@azure/msal-node'

import { Injectable, NestMiddleware } from '@nestjs/common'
import { NextFunction, Request, Response } from 'express'
import { EntraIdConfigProvider } from './entra-id-config.provider'
import { EntraIdService } from './entra-id.service'

@Injectable()
export class EntraIdLoginMiddleware implements NestMiddleware {
  private authorizationUrlRequestParams: AuthorizationUrlRequest

  constructor(
    private readonly idService: EntraIdService,
    private readonly configProvider: EntraIdConfigProvider
  ) {
    this.authorizationUrlRequestParams = this.prepareAuthCodeRequestParams()
  }

  use(_: Request, res: Response, next: NextFunction) {
    this.redirectToAuthCodeUrl()(res, next)
    return null
  }

  private redirectToAuthCodeUrl() {
    return async (res: Response, next: NextFunction) => {
      // Generate PKCE Codes before starting the authorization flow
      const { challenge } =
        await this.idService.cryptoProvider.generatePkceCodes()

      const authCodeUrlRequest = {
        ...this.authorizationUrlRequestParams,
        responseMode: ResponseMode.FORM_POST, // recommended for confidential clients
        codeChallenge: challenge,
        codeChallengeMethod: 'S256',
      }

      this.idService
        .getClientApplication()
        .then((a) => {
          a.getAuthCodeUrl(authCodeUrlRequest)
            .then((url) => res.redirect(url))
            .catch((err) => {
              console.error(err)
              next(err)
            })
        })
        .catch((err) => {
          console.error(err)
          next(err)
        })
    }
  }

  private prepareAuthCodeRequestParams(): AuthorizationUrlRequest {
    const options = this.configProvider.options
    /**
     * MSAL Node library allows you to pass your custom state as state parameter in the Request object.
     * The state parameter can also be used to encode information of the app's state before redirect.
     * You can pass the user's state in the app, such as the page or view they were on, as input to this parameter.
     */
    const state: string = this.idService.cryptoProvider.base64Encode(
      JSON.stringify({
        successRedirect: options.successRedirect || '/',
      })
    )

    return {
      state: state,
      /**
       * By default, MSAL Node will add OIDC scopes to the auth code url request. For more information, visit:
       * https://docs.microsoft.com/azure/active-directory/develop/v2-permissions-and-consent#openid-connect-scopes
       */
      scopes: options.scopes || [],
      redirectUri: options.redirectUri,
    }
  }
}
