import { Module } from '@nestjs/common';

import { WebSocketService } from './web-socket.service';
import { AuthModule } from 'src/services/auth/auth.module';

@Module({
  imports: [AuthModule],
  providers: [WebSocketService],
  exports: [WebSocketService],
})
export class WebSocketModule {}
