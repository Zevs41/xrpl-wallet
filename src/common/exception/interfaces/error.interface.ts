import type { ErrorHttpStatusCode } from '@nestjs/common/utils/http-error-by-code.util';

export interface IError {
  httpCode: ErrorHttpStatusCode;
  messageDebug: string;
  data?: any;
}
