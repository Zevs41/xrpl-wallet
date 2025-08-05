import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatDomainModule } from 'src/domains/chat/chat-domain.module';
import { WebSocketModule } from 'src/common/web-socket/web-socket.module';
import { MessageDomainModule } from 'src/domains/message/message-domain.module';
import { AttachmentDomainModule } from 'src/domains/attachment/attachment-domain.module';

@Module({
  imports: [
    ChatDomainModule,
    WebSocketModule,
    MessageDomainModule,
    AttachmentDomainModule,
  ],
  providers: [ChatService],
  exports: [ChatService],
})
export class ChatServiceModule {}
