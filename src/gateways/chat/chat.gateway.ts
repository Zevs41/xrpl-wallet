import { Injectable } from '@nestjs/common';
import {
  ConnectedSocket,
  MessageBody,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';

import { WSServerEvents } from 'src/common/web-socket/enums/web-socket.enum';
import type { WebSocketClient } from 'src/common/web-socket/interface/web-socket-client.interface';
import { ReqConnectToChatDto } from './dto/req/req-connect-to-chat.dto';
import { AdvancedWebSocketGateway } from 'src/common/decorator/advanced-web-socket-gateway.decorator';
import { ChatService } from 'src/services/chat/chat.service';
import { Chat, Message } from '@prisma/client';
import { ReqSendTextMessageDto } from './dto/req/req-send-text-message.dto';
import { ReqSendFileMessageDto } from './dto/req/req-send-file-message.dto';

@Injectable()
@AdvancedWebSocketGateway()
export class ChatGateway implements OnGatewayDisconnect {
  @WebSocketServer()
  private readonly server: Server<any, any, any, WebSocketClient['data']>;

  constructor(private readonly chatService: ChatService) {}

  @SubscribeMessage(WSServerEvents.ChatConnect)
  async connectToChat(
    @ConnectedSocket() client: WebSocketClient,
    @MessageBody() data: ReqConnectToChatDto,
  ): Promise<Chat> {
    return this.chatService.connectToChat(this.server, client, data);
  }

  @SubscribeMessage(WSServerEvents.SendTextMessage)
  async sendTextMessage(
    @ConnectedSocket() client: WebSocketClient,
    @MessageBody() data: ReqSendTextMessageDto,
  ): Promise<Message> {
    return this.chatService.sendTextMessage(this.server, client, data);
  }

  @SubscribeMessage(WSServerEvents.SendFileMessage)
  async sendFileMessage(
    @ConnectedSocket() client: WebSocketClient,
    @MessageBody() data: ReqSendFileMessageDto,
  ): Promise<Message> {
    return this.chatService.sendFileMessage(this.server, client, data);
  }

  async handleDisconnect(webSocketClient: WebSocketClient) {
    return this.chatService.handleDisconnect(this.server, webSocketClient);
  }
}
