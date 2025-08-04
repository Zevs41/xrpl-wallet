import { Injectable } from '@nestjs/common';
import { MessageStatus } from '@prisma/client';
import { Server } from 'socket.io';
import { BackendException } from 'src/common/exception/backend.exception';
import { EErrorCode } from 'src/common/exception/enums/error-code.enum';
import { WSClientEvents } from 'src/common/web-socket/enums/web-socket.enum';
import { WebSocketClient } from 'src/common/web-socket/interface/web-socket-client.interface';
import { WebSocketService } from 'src/common/web-socket/web-socket.service';
import { ChatDomain } from 'src/domains/chat/chat.domain';
import { MessageDomain } from 'src/domains/message/message.domain';
import { ReqConnectToChatDto } from 'src/gateways/chat/dto/req/req-connect-to-chat.dto';
import { ReqSendFileMessageDto } from 'src/gateways/chat/dto/req/req-send-file-message.dto';
import { ReqSendTextMessageDto } from 'src/gateways/chat/dto/req/req-send-text-message.dto';

@Injectable()
export class ChatService {
  constructor(
    private readonly chatDomain: ChatDomain,
    private readonly messageDomain: MessageDomain,
    private readonly webSocketService: WebSocketService,
  ) {}

  async connectToChat(
    server: Server<any, any, any, WebSocketClient['data']>,
    client: WebSocketClient,
    data: ReqConnectToChatDto,
  ) {
    if (client.data.authState === 'authenticated') {
      throw new BackendException(EErrorCode.AlreadyAuthorized);
    }

    const clientData = await this.webSocketService.handleAuth(
      server,
      client,
      data.jwtToken,
    );

    let chat = await this.chatDomain.findChatByUserIds(
      clientData.profileUuid,
      data.profileUuid,
    );

    if (!chat)
      chat = await this.chatDomain.createChatWithProfiles(
        clientData.profileUuid,
        data.profileUuid,
      );

    client.data.chatUuid = chat.uuid;

    client.data.companionProfileUuid = await this.chatDomain.findCompanion(
      chat.uuid,
      client.data.profileUuid,
    );

    const sockets = await server.fetchSockets();

    const secondProfile = sockets.filter(
      (socket) => socket.data.profileUuid === data.profileUuid,
    );

    if (!!secondProfile.length)
      secondProfile[0].emit(WSClientEvents.ChatCompanionConnected, {
        chatUuid: chat.uuid,
      });

    await this.chatDomain.readDeliveriedMessages(chat.uuid);

    return chat;
  }

  async sendTextMessage(
    server: Server<any, any, any, WebSocketClient['data']>,
    client: WebSocketClient,
    data: ReqSendTextMessageDto,
  ) {
    const sockets = await server.fetchSockets();

    const secondProfile = sockets.filter(
      (socket) => socket.data.profileUuid === client.data.companionProfileUuid,
    );

    if (!!secondProfile.length) {
      secondProfile[0].emit(WSClientEvents.ChatNewMessage, {
        text: data.text,
      });
    }

    await this.messageDomain.create({
      chatUuid: client.data.chatUuid,
      creatorProfileUuid: client.data.profileUuid,
      text: data.text,
      status: !!secondProfile.length
        ? MessageStatus.readed
        : MessageStatus.delivered,
    });
  }

  async sendFileMessage(
    server: Server<any, any, any, WebSocketClient['data']>,
    client: WebSocketClient,
    data: ReqSendFileMessageDto,
  ) {
    await this.sendTextMessage(server, client, { text: data.url });
  }

  async handleDisconnect(
    server: Server<any, any, any, WebSocketClient['data']>,
    client: WebSocketClient,
  ) {
    const sockets = await server.fetchSockets();

    const secondProfile = sockets.filter(
      (socket) => socket.data.profileUuid === client.data.companionProfileUuid,
    );

    if (!!secondProfile.length)
      secondProfile[0].emit(WSClientEvents.ChatCompanionDisconnected, {
        chatUuid: client.data.chatUuid,
      });
  }
}
