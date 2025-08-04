import type { WSClientEvents } from '../enums/web-socket.enum';

export interface ClientEventSubject {
  walletUuid: string;
  eventName: WSClientEvents;
  data: unknown;
}
