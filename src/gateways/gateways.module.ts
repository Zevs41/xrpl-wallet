import { Module } from '@nestjs/common';
import { ChatGatewayModule } from './chat/chat-gateway.module';

@Module({
  imports: [ChatGatewayModule],
})
export class GatewaysModule {}
