import {
  Injectable,
  Module,
  NestMiddleware,
  RequestMethod,
} from '@nestjs/common'
import { ConMentorshipMatchesModule } from '../con-mentorship-matches/con-mentorship-matches.module'
import { ConProfilesModule } from '../con-profiles/con-profiles.module'
import { SfApiModule } from '../salesforce-api/sf-api.module'
import { ReminderEmailsController } from './reminder-emails.controller'
import { ReminderEmailsService } from './reminder-emails.service'

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req, res, next) {
    if (
      req.headers.authorization !==
      process.env.NX_DAILY_CRONJOB_SEND_REMINDER_EMAIL_SECRET_TOKEN
    ) {
      res.status(401).send('Unauthorized')
      return
    }
    next()
  }
}

@Module({
  imports: [SfApiModule, ConProfilesModule, ConMentorshipMatchesModule],
  controllers: [ReminderEmailsController],
  providers: [ReminderEmailsService],
})
export class ReminderEmailsModule {
  configure(consumer: any) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL })
  }
}
