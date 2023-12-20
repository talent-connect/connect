import { Controller, Post, Req } from '@nestjs/common';
import { Request } from 'express';
import { EntraIdService } from './entra-id.service';

@Controller('auth')
export class EntraIdController {
  constructor(private readonly entraIdService: EntraIdService) {}

  @Post('entra-id')
  entraId(@Req() req: Request) {
    return this.entraIdService.loginUrl(req)
  }
}
