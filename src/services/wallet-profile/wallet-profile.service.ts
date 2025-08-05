import { Injectable } from '@nestjs/common';
import { WalletProfile } from '@prisma/client';
import { ReqCreateWalletProfileDto } from 'src/controller/v1/profile/dto/req/create-wallet-profile.dto';
import { WalletProfileDomain } from 'src/domains/wallet-profile/wallet-profile.domain';

@Injectable()
export class WalletProfileService {
  constructor(private readonly walletProfileDomain: WalletProfileDomain) {}

  get(profileUuid: string): Promise<WalletProfile[]> {
    return this.walletProfileDomain.get(profileUuid);
  }

  create(
    walletUuid: string,
    data: ReqCreateWalletProfileDto,
  ): Promise<WalletProfile> {
    return this.walletProfileDomain.create(walletUuid, data);
  }

  update(
    walletUuid: string,
    data: ReqCreateWalletProfileDto,
  ): Promise<WalletProfile> {
    return this.walletProfileDomain.update(walletUuid, data);
  }

  delete(walletUuid: string, profileUuid: string): Promise<WalletProfile> {
    return this.walletProfileDomain.delete(walletUuid, profileUuid);
  }
}
