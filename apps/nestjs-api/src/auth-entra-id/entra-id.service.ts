import {
  AuthorizationUrlRequest,
  ConfidentialClientApplication,
  CryptoProvider,
} from '@azure/msal-node'

import { Injectable } from '@nestjs/common'
import { EntraIdConfigProvider } from './entra-id-config.provider'

@Injectable()
export class EntraIdService {
  cryptoProvider = new CryptoProvider()

  constructor(private readonly configProvider: EntraIdConfigProvider) {}

  async loginUrl() {
    const authCodeUrlParameters: AuthorizationUrlRequest = {
      state: this.cryptoProvider.base64Encode(
        JSON.stringify({
          successRedirect: this.configProvider.options.successRedirect || '/',
        })
      ),
      scopes: this.configProvider.options.scopes || [],
      redirectUri: this.configProvider.options.redirectUri,
    }

    // By default, MSAL Node will add OIDC scopes to the auth code url request. For more information, visit:
    // https://docs.microsoft.com/azure/active-directory/develop/v2-permissions-and-consent#openid-connect-scopes
    new ConfidentialClientApplication(this.configProvider.msalConfig)
      .getAuthCodeUrl(authCodeUrlParameters)
      .then((response) => {
        return response
      })
      .catch((error) => console.error(JSON.stringify(error)))
  }
}
