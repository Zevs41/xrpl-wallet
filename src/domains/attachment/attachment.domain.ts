import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { ICreateAttachment } from './interface/create-attachment.interface';
import { Attachment } from '@prisma/client';

@Injectable()
export class AttachmentDomain {
  constructor(private readonly prismaService: PrismaService) {}

  create(data: ICreateAttachment): Promise<Attachment> {
    return this.prismaService.attachment.create({ data: data });
  }
}
