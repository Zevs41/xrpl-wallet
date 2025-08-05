import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { PayloadData } from 'src/common/decorator/payload-data.decorator';
import { JwtAuthGuard } from 'src/common/guards/jwtAuth.guard';
import { JwtPayload } from 'src/services/auth/types';
import { WalletProfile } from '@prisma/client';
import { ReqCreateWalletProfileDto } from './dto/req/create-wallet-profile.dto';
import { WalletProfileService } from 'src/services/wallet-profile/wallet-profile.service';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('v1/wallet-profile')
export class WalletProfileController {
  constructor(private readonly walletProfileService: WalletProfileService) {}

  @Get('/:profileUuid')
  get(
    @Param('profileUuid', ParseUUIDPipe) profileUuid: string,
  ): Promise<WalletProfile[]> {
    return this.walletProfileService.get(profileUuid);
  }

  @Post('')
  create(
    @Body() data: ReqCreateWalletProfileDto,
    @PayloadData() payload: JwtPayload,
  ): Promise<WalletProfile> {
    return this.walletProfileService.create(payload.walletUuid, data);
  }

  @Patch('')
  update(
    @Body() data: ReqCreateWalletProfileDto,
    @PayloadData() payload: JwtPayload,
  ): Promise<WalletProfile> {
    return this.walletProfileService.update(payload.walletUuid, data);
  }

  @Delete('/:profileUuid')
  delete(
    @Param('profileUuid', ParseUUIDPipe) profileUuid: string,
    @PayloadData() payload: JwtPayload,
  ): Promise<WalletProfile> {
    return this.walletProfileService.delete(payload.walletUuid, profileUuid);
  }
}
