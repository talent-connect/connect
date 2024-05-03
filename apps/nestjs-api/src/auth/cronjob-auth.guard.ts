import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { Observable } from 'rxjs'

@Injectable()
export class CronjobAuthGuard implements CanActivate {
  constructor(private config: ConfigService) {}

  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest()
    return (
      request.headers.authorization ===
      this.config.get('NX_DAILY_CRONJOB_SEND_REMINDER_EMAIL_SECRET_TOKEN')
    )
  }
}
