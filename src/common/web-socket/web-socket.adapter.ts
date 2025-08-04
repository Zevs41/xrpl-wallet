import type { INestApplicationContext } from '@nestjs/common';
import { IoAdapter } from '@nestjs/platform-socket.io';
import type { ServerOptions, Server, ExtendedError } from 'socket.io';
import { Logger } from '@nestjs/common';

import type { WebSocketClient } from './interface/web-socket-client.interface';
import { WebSocketService } from './web-socket.service';

export class SocketAdapter extends IoAdapter {
  private readonly webSocketService: WebSocketService;

  constructor(app: INestApplicationContext) {
    super(app);
    this.webSocketService = app.get(WebSocketService);
  }

  async authMiddleware(
    server: Server<any, any, any, WebSocketClient['data']>,
    client: WebSocketClient,
  ): Promise<void> {
    const authorization = client.handshake?.headers?.authorization;
    const [type, initData] = authorization?.split(' ') ?? [];

    if (type !== 'tma') {
      client.data.authState = 'unauthenticated';
      return;
    }

    await this.webSocketService.handleAuth(
      server,
      client,
      initData,
    );
  }

  createIOServer(port: number, options?: ServerOptions) {
    const server: Server<any, any, any, WebSocketClient['data']> =
      super.createIOServer(port, {
        ...options,
        cors: true,
      });

    server.use(
      async (socket: WebSocketClient, next: (err?: ExtendedError) => void) => {
        try {
          await this.authMiddleware(server, socket);
          socket.setMaxListeners(100);
          next();
        } catch (error) {
          Logger.error('Unable check auth in middleware', error);
          next(error);
        }
      },
    );

    return server;
  }
}
