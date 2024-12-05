import { Controller, Get, UseGuards } from '@nestjs/common'
import { CurrentUser } from '../auth/current-user.decorator'
import { CurrentUserInfo } from '../auth/current-user.interface'
import { JwtAuthGuard } from '../auth/jwt-auth.guard'
import { AppService } from './app.service'

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  getData(@CurrentUser() user: CurrentUserInfo) {
    return this.appService.getData()
  }

  @Get('healthcheck')
  healthCheck() {
    return { status: 'ok' }
  }
}
