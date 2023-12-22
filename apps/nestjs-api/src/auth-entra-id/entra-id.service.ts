import {
  ClientApplication,
  ConfidentialClientApplication,
  Configuration,
  CryptoProvider,
} from '@azure/msal-node'
import { HttpService } from '@nestjs/axios'
import { Injectable } from '@nestjs/common'
import { AxiosError, AxiosRequestConfig } from 'axios'
import { firstValueFrom } from 'rxjs'
import { catchError } from 'rxjs/operators'
import { EntraIdConfigProvider } from './entra-id-config.provider'

@Injectable()
export class EntraIdService {
  cryptoProvider = new CryptoProvider()

  constructor(
    private readonly configProvider: EntraIdConfigProvider,
    private readonly httpService: HttpService
  ) {}

  async getClientApplication(): Promise<ClientApplication> {
    const config = await this.prepareConfig()

    return new Promise((resolve) => {
      return resolve(new ConfidentialClientApplication(config))
    })
  }

  private async prepareConfig(): Promise<Configuration> {
    const config = this.configProvider.msalConfig

    /**
     * If the current msal configuration does not have cloudDiscoveryMetadata or authorityMetadata, we will
     * make a request to the relevant endpoints to retrieve the metadata. This allows MSAL to avoid making
     * metadata discovery calls, thereby improving performance of token acquisition process. For more, see:
     * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-node/docs/performance.md
     */
    if (!config.auth.cloudDiscoveryMetadata || !config.auth.authorityMetadata) {
      const [cloudDiscoveryMetadata, authorityMetadata] = await Promise.all([
        this.getCloudDiscoveryMetadata(),
        this.getAuthorityMetadata(),
      ])

      config.auth.cloudDiscoveryMetadata = JSON.stringify(
        cloudDiscoveryMetadata
      )
      config.auth.authorityMetadata = JSON.stringify(authorityMetadata)
    }

    return config
  }

  // Retrieves cloud discovery metadata from the /discovery/instance endpoint
  private async getCloudDiscoveryMetadata() {
    const endpoint = `${this.configProvider.options.cloudInstance}/common/discovery/instance`

    return this.queryEndpoint(endpoint, {
      params: {
        'api-version': '1.1',
        authorization_endpoint: `${this.configProvider.msalConfig.auth.authority}/oauth2/v2.0/authorize`,
      },
    })
  }

  // Retrieves oidc metadata from the openid endpoint
  private async getAuthorityMetadata() {
    const endpoint = `${this.configProvider.msalConfig.auth.authority}/v2.0/.well-known/openid-configuration`

    return this.queryEndpoint(endpoint)
  }

  private async queryEndpoint(endpoint: string, params?: AxiosRequestConfig) {
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
}
