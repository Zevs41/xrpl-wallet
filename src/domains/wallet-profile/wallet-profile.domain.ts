import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { WalletProfile } from '@prisma/client';
import { ReqCreateWalletProfileDto } from 'src/controller/v1/profile/dto/req/create-wallet-profile.dto';

@Injectable()
export class WalletProfileDomain {
  constructor(private readonly prismaService: PrismaService) {}

  get(profileUuid: string): Promise<WalletProfile[]> {
    return this.prismaService.walletProfile.findMany({
      where: { profileUuid: profileUuid },
    });
  }

  create(
    walletUuid: string,
    data: ReqCreateWalletProfileDto,
  ): Promise<WalletProfile> {
    return this.prismaService.walletProfile.create({
      data: { walletUuid: walletUuid, ...data },
    });
  }

  update(
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

  delete(walletUuid: string, profileUuid: string): Promise<WalletProfile> {
    return this.prismaService.walletProfile.delete({
      where: {
        walletUuid_profileUuid: {
          profileUuid: profileUuid,
          walletUuid: walletUuid,
        },
      },
    });
  }
}
