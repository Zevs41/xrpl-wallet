import { IsString } from 'class-validator';

export class ReqVerifyDto {
  @IsString()
  walletAddress: string;

  @IsString()
  publicKey: string;

  @IsString()
  signature: string;

  @IsString()
  challengeToken: string;
}
