import type { Socket } from 'socket.io';

export interface WebSocketClient extends Socket {
  data: {
    authState: 'authenticated' | 'unauthenticated';
    walletUuid: string;
    profileUuid: string;
    chatUuid: string;
    companionProfileUuid: string;
  };
}
