import { Controller, Get } from '@nestjs/common'

@Controller('hello') // /auth-blabla/method
export class AuthBlablaController {
  constructor() {
    console.log('AuthBlablaController constructor')
  }

  @Get('stuart')
  stuart() {
    return 'Hello Wofjweiofjrld!'
  }
}
