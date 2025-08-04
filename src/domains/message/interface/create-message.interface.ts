import { MessageStatus } from '@prisma/client';

export interface ICreateMessage {
  chatUuid: string;
  creatorProfileUuid: string;
  text: string;
  status?: MessageStatus;
}
