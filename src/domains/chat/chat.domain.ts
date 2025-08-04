import { Injectable } from '@nestjs/common';
import { MessageStatus } from '@prisma/client';
import { PrismaService } from 'src/common/prisma/prisma.service';

@Injectable()
export class ChatDomain {
  constructor(private readonly prismaService: PrismaService) {}

  async findChatByUserIds(firstProfileUuid: string, secondProfileUuid: string) {
    const firstProfileChats = await this.prismaService.profileChat.findMany({
      where: { profileUuid: firstProfileUuid },
      select: { chatUuid: true },
    });

    if (firstProfileChats.length === 0) return null;

    const chatUuids = firstProfileChats.map((chat) => chat.chatUuid);

    const commonChat = await this.prismaService.profileChat.findFirst({
      where: {
        chatUuid: { in: chatUuids },
        profileUuid: secondProfileUuid,
      },
      include: {
        chat: {
          include: {
            message: true,
            attachment: true,
            profileChat: {
              include: {
                profile: true,
              },
            },
          },
        },
      },
    });

    return commonChat?.chat || null;
  }

  async createChatWithProfiles(
    firstProfileUuid: string,
    secondProfileUuid: string,
  ) {
    return this.prismaService.chat.create({
      data: {
        profileChat: {
          createMany: {
            data: [
              { profileUuid: firstProfileUuid },
              { profileUuid: secondProfileUuid },
            ],
          },
        },
      },
      include: {
        attachment: true,
        message: true,
        profileChat: {
          include: {
            profile: true,
          },
        },
      },
    });
  }

  findCompanion(chatUuid: string, profileUuid: string): Promise<string> {
    return this.prismaService.profileChat
      .findFirstOrThrow({
        where: { chatUuid: chatUuid, NOT: { profileUuid: profileUuid } },
        select: { profileUuid: true },
      })
      .then((data) => data?.profileUuid);
  }

  async readDeliveriedMessages(chatUuid: string) {
    return this.prismaService.message.updateMany({
      where: { chatUuid: chatUuid, status: MessageStatus.delivered },
      data: { status: MessageStatus.readed },
    });
  }
}
