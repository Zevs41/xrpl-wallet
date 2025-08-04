import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { PayloadData } from 'src/common/decorator/payload-data.decorator';
import { JwtAuthGuard } from 'src/common/guards/jwtAuth.guard';
import { JwtPayload } from 'src/services/auth/types';
import { ProfileService } from 'src/services/profile/profile.service';
import { ReqCreateProfileDto } from './dto/req/create-profile.dto';
import { ReqUpdateProfileDto } from './dto/req/update-profile.dto';
import { Profile, WalletProfile } from '@prisma/client';
import { ReqCreateWalletProfileDto } from './dto/req/create-wallet-profile.dto';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('v1/profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Post('')
  create(
    @Body() data: ReqCreateProfileDto,
    @PayloadData() payload: JwtPayload,
  ): Promise<Profile> {
    return this.profileService.create(payload.walletUuid, data);
  }

  @Patch('')
  update(
    @Body() data: ReqUpdateProfileDto,
    @PayloadData() payload: JwtPayload,
  ): Promise<Profile> {
    return this.profileService.update(payload.walletUuid, data);
  }

  @Post('wallet')
  createWalletProfile(
    @Body() data: ReqCreateWalletProfileDto,
    @PayloadData() payload: JwtPayload,
  ): Promise<WalletProfile> {
    return this.profileService.createWalletProfile(payload.walletUuid, data);
  }

  @Patch('wallet')
  updateWalletProfile(
    @Body() data: ReqCreateWalletProfileDto,
    @PayloadData() payload: JwtPayload,
  ): Promise<WalletProfile> {
    return this.profileService.updateWalletProfile(payload.walletUuid, data);
  }

  @Delete('wallet/:profileUuid')
  deleteWalletProfile(
    @Param('profileUuid') profileUuid: string,
    @PayloadData() payload: JwtPayload,
  ): Promise<WalletProfile> {
    return this.profileService.deleteWalletProfile(
      payload.walletUuid,
      profileUuid,
    );
  }

  @Get('my')
  getMyProfile(@PayloadData() payloadData: JwtPayload): Promise<Profile> {
    return this.profileService.getMyProfile(payloadData.walletUuid);
  }

  @Get('uniqueUsername')
  getUniqueUsername(): Promise<string> {
    return this.profileService.getUniqueUsername();
  }

  @Get('checkUniqueUsername/:potentialUsername')
  checkUniqueUsername(
    @Param('potentialUsername') potentialUsername: string,
  ): Promise<boolean> {
    return this.profileService.checkUniqueUsername(potentialUsername);
  }
}
