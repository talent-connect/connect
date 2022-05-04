import { Injectable } from '@nestjs/common'
import { sendMentorshipDeclinedEmail } from './lib/email/email'

@Injectable()
export class EmailService {
  emailLib() {
    sendMentorshipDeclinedEmail()
  }
}
