import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { EventEmitter2 } from '@nestjs/event-emitter'
import * as jsforce from 'jsforce'
import { ChannelToEventMap } from './channel-to-event-map'
import { EventMappers } from './event-mappers'

@Injectable()
export class SalesforceRecordEventsListenerService {
  private loginUrl: string
  private username: string
  private password: string
  private securityToken: string
  private clientId: string
  private clientSecret: string
  private connection: any

  constructor(
    private readonly configService: ConfigService,
    private eventEmitter: EventEmitter2
  ) {
    this.loginUrl = this.configService.get<string>(
      'NX_SALESFORCE_API_LOGIN_URL'
    )
    this.username = this.configService.get<string>('NX_SALESFORCE_API_USERNAME')
    this.password = this.configService.get<string>('NX_SALESFORCE_API_PASSWORD')
    this.securityToken = this.configService.get<string>(
      'NX_SALESFORCE_API_SECURITY_TOKEN'
    )
    this.clientId = this.configService.get<string>(
      'NX_SALESFORCE_API_CLIENT_ID'
    )
    this.clientSecret = this.configService.get<string>(
      'NX_SALESFORCE_API_CLIENT_SECRET'
    )

    this.connection = new jsforce.Connection({
      loginUrl: this.loginUrl,
      clientId: this.clientId,
      clientSecret: this.clientSecret,
      maxRequest: 100,
    })

    this.setupListeners()
  }

  async connect() {
    try {
      await this.connection.login(
        this.username,
        `${this.password}${this.securityToken}`
      )
    } catch (err) {
      console.log('connection err', err)
    }
  }

  async setupListeners() {
    await this.connect()

    var replayId = -1 // -1 = Only New messages | -2 = All Window and New

    console.log(
      `[SalesforceRecordEventsListenerService]`,
      `Setting up SF event listeners`
    )

    var client = this.connection.streaming.createClient([
      ...Object.keys(ChannelToEventMap).map(
        (channel) => new jsforce.StreamingExtension.Replay(channel, replayId)
      ),
      new jsforce.StreamingExtension.AuthFailure(function () {
        return process.exit(1)
      }),
    ])

    Object.entries(ChannelToEventMap).forEach(([channel, event]) => {
      const subscription = client.subscribe(channel, (externalEventPayload) => {
        const internalEventPayload = EventMappers[event](externalEventPayload)
        this.eventEmitter.emit(event, internalEventPayload)
      })
    })
  }
}
