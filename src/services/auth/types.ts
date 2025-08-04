export interface ChallengeToken {
  token: string;
  expiresAt: Date;
}

export interface JwtPayload {
  walletUuid: string;
}
