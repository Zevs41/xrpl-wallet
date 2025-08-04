import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { ReqCreateProfileDto } from 'src/controller/v1/profile/dto/req/create-profile.dto';
import { faker } from '@faker-js/faker';
import { ReqUpdateProfileDto } from 'src/controller/v1/profile/dto/req/update-profile.dto';
import { Profile, WalletProfile } from '@prisma/client';
import { ReqCreateWalletProfileDto } from 'src/controller/v1/profile/dto/req/create-wallet-profile.dto';

@Injectable()
export class ProfileDomain {
  constructor(private readonly prismaService: PrismaService) {}

  create(walletUuid: string, data: ReqCreateProfileDto): Promise<Profile> {
    return this.prismaService.profile.create({
      data: { walletUuid: walletUuid, ...data },
    });
  }

  update(walletUuid: string, data: ReqUpdateProfileDto): Promise<Profile> {
    return this.prismaService.profile.update({
      where: { walletUuid: walletUuid },
      data: { ...data },
    });
  }

  createWalletProfile(
    walletUuid: string,
    data: ReqCreateWalletProfileDto,
  ): Promise<WalletProfile> {
    return this.prismaService.walletProfile.create({
      data: { walletUuid: walletUuid, ...data },
    });
  }

  updateWalletProfile(
    walletUuid: string,
    data: ReqCreateWalletProfileDto,
  ): Promise<WalletProfile> {
    return this.prismaService.walletProfile.update({
      where: {
        walletUuid_profileUuid: {
          profileUuid: data.profileUuid,
          walletUuid: walletUuid,
        },
      },
      data: { visibility: data.visibility },
    });
  }

  deleteWalletProfile(
    walletUuid: string,
    profileUuid: string,
  ): Promise<WalletProfile> {
    return this.prismaService.walletProfile.delete({
      where: {
        walletUuid_profileUuid: {
          profileUuid: profileUuid,
          walletUuid: walletUuid,
        },
      },
    });
  }

  getMyProfile(walletUuid: string): Promise<Profile> {
    return this.prismaService.profile.findUniqueOrThrow({
      where: { walletUuid: walletUuid },
    });
  }

  async getUniqueUsername(): Promise<string> {
    let potentialUsername =
      faker.person.fullName().replaceAll(' ', '') +
      faker.number.int({ min: 1, max: 99999 });

    const check = await this.prismaService.profile.findFirst({
      where: { username: potentialUsername },
    });

    if (check) {
      potentialUsername = await this.getUniqueUsername();
    }

    return potentialUsername;
  }

  async checkUniqueUsername(potentialUsername: string): Promise<boolean> {
    return this.prismaService.profile
      .findFirst({
        where: { username: potentialUsername },
      })
      .then((profile) => !profile);
  }
}
