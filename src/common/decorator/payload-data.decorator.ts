import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { JwtPayload } from 'src/services/auth/types';

export const PayloadData = createParamDecorator(
  (_data: unknown, context: ExecutionContext): JwtPayload => {
    return context.switchToHttp().getRequest().user as JwtPayload;
  },
);
