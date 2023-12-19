import { Controller, Post } from '@nestjs/common';
import { EntraIdService } from './entra-id.service';

@Controller('auth')
export class EntraIdController {
  constructor(private readonly entraIdService: EntraIdService) {}

  @Post('entra-id')
  entraId() {
    return this.entraIdService.loginUrl()
  }
}
