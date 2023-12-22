import { Controller, Get, Next, Post, Req, Res } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { EntraIdLoginMiddleware } from './entra-id-login.middleware';

@Controller('auth')
export class EntraIdController {
  constructor(private readonly entraIdService: EntraIdLoginMiddleware) {}

  // empty route to trigger the entra-id auth middleware
  @Get('entra-id')
  entraId() {
    return ''
  }

  @Get('entra-redirect')
  redirectGet(@Req() req: Request, @Res() res: Response, @Next() next: NextFunction) {
    console.log('get entra-redirect', req.body)
    return ''
  }

  @Post('entra-redirect')
  redirectPost(@Req() req: Request, @Res() res: Response, @Next() next: NextFunction) {
    
    console.log('post entra-redirect', req.body)
    return ''
  }
}
