-- CreateEnum
CREATE TYPE "public"."MessageStatus" AS ENUM ('delivered', 'readed');

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
    "deletedAt" TIMESTAMPTZ,
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
CREATE TABLE "public"."WalletProfile" (
    "uuid" UUID NOT NULL DEFAULT gen_random_uuid(),
    "walletUuid" UUID NOT NULL,
    "profileUuid" UUID NOT NULL,
    "visibility" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "WalletProfile_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "public"."WalletRefreshToken" (
    "token" TEXT NOT NULL,
    "walletUuid" UUID NOT NULL,
    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expDate" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "WalletRefreshToken_pkey" PRIMARY KEY ("token")
);

-- CreateTable
CREATE TABLE "public"."Chat" (
    "uuid" UUID NOT NULL DEFAULT gen_random_uuid(),
    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Chat_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "public"."ProfileChat" (
    "uuid" UUID NOT NULL DEFAULT gen_random_uuid(),
    "profileUuid" UUID NOT NULL,
    "chatUuid" UUID NOT NULL,

    CONSTRAINT "ProfileChat_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "public"."Attachment" (
    "uuid" UUID NOT NULL DEFAULT gen_random_uuid(),
    "chatUuid" UUID NOT NULL,
    "creatorProfileUuid" UUID NOT NULL,
    "fileUrl" TEXT NOT NULL,
    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Attachment_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "public"."Message" (
    "uuid" UUID NOT NULL DEFAULT gen_random_uuid(),
    "text" TEXT NOT NULL,
    "chatUuid" UUID NOT NULL,
    "creatorProfileUuid" UUID NOT NULL,
    "status" "public"."MessageStatus" NOT NULL DEFAULT 'delivered',
    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Message_pkey" PRIMARY KEY ("uuid")
);

-- CreateIndex
CREATE UNIQUE INDEX "Profile_username_key" ON "public"."Profile"("username");

-- CreateIndex
CREATE UNIQUE INDEX "Profile_walletUuid_key" ON "public"."Profile"("walletUuid");

-- CreateIndex
CREATE UNIQUE INDEX "Wallet_address_key" ON "public"."Wallet"("address");

-- CreateIndex
CREATE UNIQUE INDEX "Wallet_publicKey_key" ON "public"."Wallet"("publicKey");

-- CreateIndex
CREATE UNIQUE INDEX "WalletProfile_walletUuid_profileUuid_key" ON "public"."WalletProfile"("walletUuid", "profileUuid");

-- CreateIndex
CREATE UNIQUE INDEX "ProfileChat_profileUuid_chatUuid_key" ON "public"."ProfileChat"("profileUuid", "chatUuid");

-- AddForeignKey
ALTER TABLE "public"."Profile" ADD CONSTRAINT "Profile_walletUuid_fkey" FOREIGN KEY ("walletUuid") REFERENCES "public"."Wallet"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."WalletProfile" ADD CONSTRAINT "WalletProfile_walletUuid_fkey" FOREIGN KEY ("walletUuid") REFERENCES "public"."Wallet"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."WalletProfile" ADD CONSTRAINT "WalletProfile_profileUuid_fkey" FOREIGN KEY ("profileUuid") REFERENCES "public"."Profile"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."WalletRefreshToken" ADD CONSTRAINT "WalletRefreshToken_walletUuid_fkey" FOREIGN KEY ("walletUuid") REFERENCES "public"."Wallet"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ProfileChat" ADD CONSTRAINT "ProfileChat_profileUuid_fkey" FOREIGN KEY ("profileUuid") REFERENCES "public"."Profile"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ProfileChat" ADD CONSTRAINT "ProfileChat_chatUuid_fkey" FOREIGN KEY ("chatUuid") REFERENCES "public"."Chat"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Attachment" ADD CONSTRAINT "Attachment_chatUuid_fkey" FOREIGN KEY ("chatUuid") REFERENCES "public"."Chat"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Attachment" ADD CONSTRAINT "Attachment_creatorProfileUuid_fkey" FOREIGN KEY ("creatorProfileUuid") REFERENCES "public"."Profile"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Message" ADD CONSTRAINT "Message_chatUuid_fkey" FOREIGN KEY ("chatUuid") REFERENCES "public"."Chat"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Message" ADD CONSTRAINT "Message_creatorProfileUuid_fkey" FOREIGN KEY ("creatorProfileUuid") REFERENCES "public"."Profile"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;
