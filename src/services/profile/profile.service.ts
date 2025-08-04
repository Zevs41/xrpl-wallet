import { Injectable } from '@nestjs/common';
import { Profile, WalletProfile } from '@prisma/client';
import { ReqCreateProfileDto } from 'src/controller/v1/profile/dto/req/create-profile.dto';
import { ReqCreateWalletProfileDto } from 'src/controller/v1/profile/dto/req/create-wallet-profile.dto';
import { ReqUpdateProfileDto } from 'src/controller/v1/profile/dto/req/update-profile.dto';
import { ProfileDomain } from 'src/domains/profile/profile.domain';

@Injectable()
export class ProfileService {
  constructor(private readonly profileDomain: ProfileDomain) {}

  create(walletUuid: string, data: ReqCreateProfileDto): Promise<Profile> {
    return this.profileDomain.create(walletUuid, data);
  }

  update(walletUuid: string, data: ReqUpdateProfileDto): Promise<Profile> {
    return this.profileDomain.update(walletUuid, data);
  }

  createWalletProfile(
    walletUuid: string,
    data: ReqCreateWalletProfileDto,
  ): Promise<WalletProfile> {
    return this.profileDomain.createWalletProfile(walletUuid, data);
  }

  updateWalletProfile(
    walletUuid: string,
    data: ReqCreateWalletProfileDto,
  ): Promise<WalletProfile> {
    return this.profileDomain.updateWalletProfile(walletUuid, data);
  }

  deleteWalletProfile(
    walletUuid: string,
    profileUuid: string,
  ): Promise<WalletProfile> {
    return this.profileDomain.deleteWalletProfile(walletUuid, profileUuid);
  }

  getMyProfile(walletUuid: string): Promise<Profile> {
    return this.profileDomain.getMyProfile(walletUuid);
  }

  getUniqueUsername(): Promise<string> {
    return this.profileDomain.getUniqueUsername();
  }

  checkUniqueUsername(potentialUsername: string): Promise<boolean> {
    return this.profileDomain.checkUniqueUsername(potentialUsername);
  }
}
