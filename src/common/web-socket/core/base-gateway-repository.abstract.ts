import { Subject } from 'rxjs';
import type { WSClientEvents } from '../enums/web-socket.enum';
import type { ClientEventSubject } from '../interface/client-event-subject.interface';

export abstract class BaseGatewayRepository {
  private wsEvents$: Subject<ClientEventSubject> =
    new Subject<ClientEventSubject>();

  public sendWebSocketEvent<EventData = unknown>(
    walletUuid: string,
    eventName: WSClientEvents,
    data?: EventData,
  ): void {
    this.wsEvents$.next({ walletUuid, eventName, data });
  }

  public getWebSocketToEmit(): Subject<ClientEventSubject> {
    return this.wsEvents$;
  }
}
