import type { OnGatewayInit } from '@nestjs/websockets';
import { WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';

import type { BaseGatewayService } from './base-gateway-service.abstract';
import type { ClientEventSubject } from '../interface/client-event-subject.interface';
import type { WebSocketClient } from '../interface/web-socket-client.interface';
import { BaseGatewayRepository } from './base-gateway-repository.abstract';
import type { WSClientEvents } from '../enums/web-socket.enum';

export abstract class BaseGateway<
  T extends BaseGatewayService | BaseGatewayRepository,
> implements OnGatewayInit
{
  @WebSocketServer()
  private readonly server: Server<any, any, any, WebSocketClient['data']>;

  private service: T;

  protected constructor(service: T) {
    this.service = service;
  }

  public sendWebSocketEvent<EventData = unknown>(
    walletUuid: string,
    eventName: WSClientEvents,
    data?: EventData,
  ): void {
    this.service.sendWebSocketEvent<EventData>(walletUuid, eventName, data);
  }

  afterInit() {
    this.service
      .getWebSocketToEmit()
      .asObservable()
      .subscribe({
        next: async (event: ClientEventSubject) => {
          const sockets = await this.server.fetchSockets();
          for (const client of sockets) {
            if (client.data.authState !== 'authenticated') {
              continue;
            }
            if (client.data.walletUuid === event.walletUuid) {
              client.emit(event.eventName, event.data);
            }
          }
        },
      });
  }
}
