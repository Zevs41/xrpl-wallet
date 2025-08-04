-- CreateTable
CREATE TABLE "public"."Profile" (
    "uuid" UUID NOT NULL DEFAULT gen_random_uuid(),
    "username" TEXT NOT NULL,
    "displayName" TEXT NOT NULL,
    "description" TEXT,
    "xcomUrl" TEXT,
    "telegramUrl" TEXT,
    "websiteUrl" TEXT,
    "instagramUrl" TEXT,
    "avatarUrl" TEXT,
    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deletedAt" TIMESTAMPTZ(3),
    "walletUuid" UUID NOT NULL,

    CONSTRAINT "Profile_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "public"."Wallet" (
    "uuid" UUID NOT NULL DEFAULT gen_random_uuid(),
    "address" TEXT NOT NULL,
    "publicKey" TEXT NOT NULL,

    CONSTRAINT "Wallet_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "public"."WalletRefreshToken" (
    "token" TEXT NOT NULL,
    "walletUuid" UUID NOT NULL,
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expDate" TIMESTAMPTZ(3) NOT NULL,

    CONSTRAINT "WalletRefreshToken_pkey" PRIMARY KEY ("token")
);

-- CreateIndex
CREATE UNIQUE INDEX "Profile_username_key" ON "public"."Profile"("username");

-- CreateIndex
CREATE UNIQUE INDEX "Profile_walletUuid_key" ON "public"."Profile"("walletUuid");

-- CreateIndex
CREATE UNIQUE INDEX "Wallet_address_key" ON "public"."Wallet"("address");

-- CreateIndex
CREATE UNIQUE INDEX "Wallet_publicKey_key" ON "public"."Wallet"("publicKey");

-- AddForeignKey
ALTER TABLE "public"."Profile" ADD CONSTRAINT "Profile_walletUuid_fkey" FOREIGN KEY ("walletUuid") REFERENCES "public"."Wallet"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."WalletRefreshToken" ADD CONSTRAINT "WalletRefreshToken_walletUuid_fkey" FOREIGN KEY ("walletUuid") REFERENCES "public"."Wallet"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;
