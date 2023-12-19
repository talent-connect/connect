import { Controller, Get } from '@nestjs/common';

@Controller('auth')
export class AuthEntraIdController {
  @Get('entra-id')
  entraId() {
    return 'test'
  }
}
