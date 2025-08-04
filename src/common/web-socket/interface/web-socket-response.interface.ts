import type { WsExceptionDto } from "src/common/exception/dto/ws-exception.dto";

export interface WebSocketErrorResponse {
  error: WsExceptionDto;
}
