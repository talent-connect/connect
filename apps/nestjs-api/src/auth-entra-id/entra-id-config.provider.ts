import msal, { LogLevel } from '@azure/msal-node'
import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { EntraIdLoginOptions } from './entra-id-login-options.interface'

@Injectable()
export class EntraIdConfigProvider {
  private readonly options: EntraIdLoginOptions
  private readonly msalConfig: msal.Configuration

  constructor(configService: ConfigService) {
    this.options = {
      scopes: [],
      redirectUri: configService.get<string>('NX_ENTRA_ID_FRONTEND_URI') + '/front/login',
      successRedirect: configService.get<string>('NX_ENTRA_ID_FRONTEND_URI') + '/front/login/entra-login',
      cloudInstance: configService.get<string>('NX_ENTRA_ID_CLOUD_INSTANCE'),
    }
    this.msalConfig = {
      auth: {
        clientId: configService.get<string>('NX_ENTRA_ID_CLIENT_ID'), // 'Application (client) ID' of app registration in Azure portal - this value is a GUID
        authority: configService.get<string>('NX_ENTRA_ID_CLOUD_INSTANCE') + '/consumers', // Full directory URL, in the form of https://login.microsoftonline.com/<tenant>
        clientSecret: configService.get<string>('NX_ENTRA_ID_CLIENT_SECRET'), // Client secret generated from the app registration in Azure portal
      },
      system: {
        loggerOptions: {
          loggerCallback(logLevel, message, containsPii) {
            if (!containsPii) {
              if (logLevel === LogLevel.Error) console.error(message)
              else console.log(message)
            }
          },
          piiLoggingEnabled: false,
          logLevel: LogLevel.Verbose,
        },
      },
    }
  }

  getMsalConfig(): msal.Configuration {
    return {auth: { ...this.msalConfig.auth }, system: { ...this.msalConfig.system }}
  }

  getOptions(): EntraIdLoginOptions {
    return {...this.options}
  }
}
