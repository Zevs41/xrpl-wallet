import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { ICreateMessage } from './interface/create-message.interface';
import { Message } from '@prisma/client';

@Injectable()
export class MessageDomain {
  constructor(private readonly prismaService: PrismaService) {}

  create(data: ICreateMessage): Promise<Message> {
    return this.prismaService.message.create({ data: data });
  }
}
