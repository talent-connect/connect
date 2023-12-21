import {
  AuthorizationUrlRequest,
  ConfidentialClientApplication,
  Configuration,
  CryptoProvider,
  ResponseMode,
} from '@azure/msal-node'

import { HttpService } from '@nestjs/axios'
import { Injectable, NestMiddleware } from '@nestjs/common'
import { AxiosError, AxiosRequestConfig } from 'axios'
import { NextFunction, Request, Response } from 'express'
import { firstValueFrom } from 'rxjs'
import { catchError } from 'rxjs/operators'
import { EntraIdConfigProvider } from './entra-id-config.provider'

@Injectable()
export class EntraIdLoginMiddleware implements NestMiddleware {
  private cryptoProvider = new CryptoProvider()
  private authorizationUrlRequestParams: AuthorizationUrlRequest

  constructor(
    private readonly configProvider: EntraIdConfigProvider,
    private readonly httpService: HttpService
  ) {
    this.authorizationUrlRequestParams = this._prepareAuthCodeRequestParams()
  }

  use(_: Request, res: Response, next: NextFunction) {
    this._prepareConfig().then((config) => {
      this._redirectToAuthCodeUrl(config)(res, next)
    })
    return null
  }

  async _prepareConfig(): Promise<Configuration> {
    const config = this.configProvider.msalConfig
    /**
     * If the current msal configuration does not have cloudDiscoveryMetadata or authorityMetadata, we will
     * make a request to the relevant endpoints to retrieve the metadata. This allows MSAL to avoid making
     * metadata discovery calls, thereby improving performance of token acquisition process. For more, see:
     * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-node/docs/performance.md
     */
    if (!config.auth.cloudDiscoveryMetadata || !config.auth.authorityMetadata) {
      const [cloudDiscoveryMetadata, authorityMetadata] = await Promise.all([
        this._getCloudDiscoveryMetadata(),
        this._getAuthorityMetadata(),
      ])

      config.auth.cloudDiscoveryMetadata = JSON.stringify(
        cloudDiscoveryMetadata
      )
      config.auth.authorityMetadata = JSON.stringify(authorityMetadata)
    }

    return config
  }

  _redirectToAuthCodeUrl(config: Configuration) {
    return async (res: Response, next: NextFunction) => {
      const msalInstance = new ConfidentialClientApplication(config)

      // Generate PKCE Codes before starting the authorization flow
      const { verifier, challenge } =
        await this.cryptoProvider.generatePkceCodes()

      // Set generated PKCE codes and method as session vars
      const pkceCodes = {
        challengeMethod: 'S256',
        verifier: verifier,
        challenge: challenge,
      }

      const authCodeUrlRequest = {
        ...this.authorizationUrlRequestParams,
        responseMode: ResponseMode.FORM_POST, // recommended for confidential clients
        codeChallenge: pkceCodes.challenge,
        codeChallengeMethod: pkceCodes.challengeMethod,
      }

      try {
        const authCodeUrl = await msalInstance.getAuthCodeUrl(
          authCodeUrlRequest
        )
        console.info(authCodeUrl)
        res.redirect(authCodeUrl)
      } catch (error) {
        next(error)
      }
    }
  }

  // Retrieves cloud discovery metadata from the /discovery/instance endpoint
  async _getCloudDiscoveryMetadata() {
    const endpoint = `${this.configProvider.options.cloudInstance}/common/discovery/instance`

    return this._queryEndpoint(endpoint, {
      params: {
        'api-version': '1.1',
        authorization_endpoint: `${this.configProvider.msalConfig.auth.authority}/oauth2/v2.0/authorize`,
      },
    })
  }

  // Retrieves oidc metadata from the openid endpoint
  async _getAuthorityMetadata() {
    const endpoint = `${this.configProvider.msalConfig.auth.authority}/v2.0/.well-known/openid-configuration`

    return this._queryEndpoint(endpoint)
  }

  async _queryEndpoint(endpoint: string, params?: AxiosRequestConfig) {
    const { data } = await firstValueFrom(
      this.httpService.get(endpoint, params).pipe(
        catchError((error: AxiosError) => {
          console.error(error.response.data)
          throw 'Could not setup login service'
        })
      )
    )

    return data
  }

  _prepareAuthCodeRequestParams(): AuthorizationUrlRequest {
    const options = this.configProvider.options
    /**
     * MSAL Node library allows you to pass your custom state as state parameter in the Request object.
     * The state parameter can also be used to encode information of the app's state before redirect.
     * You can pass the user's state in the app, such as the page or view they were on, as input to this parameter.
     */
    const state: string = this.cryptoProvider.base64Encode(
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
