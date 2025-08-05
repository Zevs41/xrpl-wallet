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

  get(profileUuid: string): Promise<Profile> {
    return this.profileDomain.get(profileUuid);
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
