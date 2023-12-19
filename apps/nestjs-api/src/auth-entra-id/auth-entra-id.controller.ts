import { Controller, Post } from '@nestjs/common';

@Controller('auth')
export class AuthEntraIdController {
  @Post('entra-id')
  entraId() {
    return 'test'
  }
}
