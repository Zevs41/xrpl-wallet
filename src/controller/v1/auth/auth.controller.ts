import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { AuthService } from 'src/services/auth/auth.service';
import { ReqVerifyDto } from './dto/req/verify.dto';
import * as keypairs from 'ripple-keypairs';
import { ResRefreshDto } from './dto/res/res-refresh.dto';
import { ReqRefreshDto } from './dto/req/req-refresh.dto';

@Controller('v1/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  //Для тестов
  @Get('challenge')
  getChallenge(@Query('walletAddress') walletAddress: string): Promise<string> {
    return this.authService.generateChallengeToken(walletAddress);
  }

  //Для тестов
  @Get('signature')
  async getSignature(
    @Query('challengeToken') challengeToken: string,
    @Query('privateKey') privateKey: string,
  ): Promise<string> {
    return keypairs.sign(
      Buffer.from(challengeToken, 'hex').toString('hex'),
      privateKey,
    );
  }

  @Post('verify')
  verify(@Body() signedChallenge: ReqVerifyDto): Promise<ResRefreshDto> {
    return this.authService.verify(signedChallenge);
  }

  @Post('refresh')
  refresh(@Body() data: ReqRefreshDto): Promise<ResRefreshDto> {
    return this.authService.refresh(data);
  }
}
