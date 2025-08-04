import { Injectable } from '@nestjs/common';
import type { Server } from 'socket.io';

import type { WebSocketClient } from './interface/web-socket-client.interface';
import { JwtPayload } from 'src/services/auth/types';
import { AuthService } from 'src/services/auth/auth.service';
import { PrismaService } from '../prisma/prisma.service';
import { BackendException } from '../exception/backend.exception';
import { EErrorCode } from '../exception/enums/error-code.enum';
import { ResConnectToChatDto } from 'src/gateways/chat/dto/res/res-connect-to-chat.dto';

@Injectable()
export class WebSocketService {
  constructor(
    private readonly authService: AuthService,
    private readonly prismaService: PrismaService,
  ) {}

  async handleAuth(
    server: Server<any, any, any, WebSocketClient['data']>,
    client: WebSocketClient,
    jwtToken: string,
  ): Promise<ResConnectToChatDto> {
    const data: JwtPayload = this.authService.decodeJwt(jwtToken);

    const profile = await this.prismaService.profile.findUnique({
      where: { walletUuid: data.walletUuid },
    });

    if (!profile) throw new BackendException(EErrorCode.NotFound);

    client.data.profileUuid = profile.uuid;
    client.data.walletUuid = data.walletUuid;
    client.data.authState = 'authenticated';

    return {
      profileUuid: client.data.profileUuid,
      walletUuid: client.data.walletUuid,
    };
  }
}
