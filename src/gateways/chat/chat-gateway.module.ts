import { Module } from '@nestjs/common';

import { WebSocketModule } from 'src/common/web-socket/web-socket.module';
import { ChatGateway } from './chat.gateway';
import { ChatServiceModule } from 'src/services/chat/chat-service.module';

@Module({
  imports: [WebSocketModule, ChatServiceModule],
  providers: [ChatGateway],
})
export class ChatGatewayModule {}
