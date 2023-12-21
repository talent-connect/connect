import { Controller, Get, Next, Post, Req, Res } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { EntraIdLoginMiddleware } from './entra-id-login.middleware';

@Controller('auth')
export class EntraIdController {
  constructor(private readonly entraIdService: EntraIdLoginMiddleware) {}

  @Get('entra-id')
  entraId(@Req() req: Request, @Res() res: Response, @Next() next: NextFunction) {
    return ''
  }

  @Get('entra-redirect')
  redirectGet(@Req() req: Request, @Res() res: Response, @Next() next: NextFunction) {
    console.log('get entra-redirect', req)
    return ''
  }

  @Post('entra-redirect')
  redirect(@Req() req: Request, @Res() res: Response, @Next() next: NextFunction) {
    console.log('post entra-redirect', req)
    return ''
  }
}
