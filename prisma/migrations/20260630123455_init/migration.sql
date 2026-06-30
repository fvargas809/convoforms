-- CreateEnum
CREATE TYPE "FormStatus" AS ENUM ('DRAFT', 'PUBLISHED', 'ARCHIVED');

-- CreateEnum
CREATE TYPE "SessionStatus" AS ENUM ('IN_PROGRESS', 'COMPLETED', 'ABANDONED');

-- CreateEnum
CREATE TYPE "MessageRole" AS ENUM ('USER', 'ASSISTANT');

-- CreateEnum
CREATE TYPE "Confidence" AS ENUM ('HIGH', 'LOW');

-- CreateTable
CREATE TABLE "Organization" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "apiKey" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Organization_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ConversationalForm" (
    "id" TEXT NOT NULL,
    "orgId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "schema" JSONB NOT NULL,
    "status" "FormStatus" NOT NULL DEFAULT 'DRAFT',
    "webhookUrl" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ConversationalForm_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FormSession" (
    "id" TEXT NOT NULL,
    "formId" TEXT NOT NULL,
    "status" "SessionStatus" NOT NULL DEFAULT 'IN_PROGRESS',
    "collectedData" JSONB NOT NULL DEFAULT '{}',
    "resumeToken" TEXT,
    "startedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "completedAt" TIMESTAMP(3),

    CONSTRAINT "FormSession_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Message" (
    "id" TEXT NOT NULL,
    "sessionId" TEXT NOT NULL,
    "role" "MessageRole" NOT NULL,
    "content" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Message_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FieldResult" (
    "id" TEXT NOT NULL,
    "sessionId" TEXT NOT NULL,
    "fieldId" TEXT NOT NULL,
    "finalValue" JSONB NOT NULL,
    "confidence" "Confidence" NOT NULL,
    "retryCount" INTEGER NOT NULL DEFAULT 0,
    "wasConfirmed" BOOLEAN NOT NULL DEFAULT false,
    "rawUserAnswers" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "FieldResult_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Organization_apiKey_key" ON "Organization"("apiKey");

-- CreateIndex
CREATE UNIQUE INDEX "ConversationalForm_slug_key" ON "ConversationalForm"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "FormSession_resumeToken_key" ON "FormSession"("resumeToken");

-- CreateIndex
CREATE UNIQUE INDEX "FieldResult_sessionId_fieldId_key" ON "FieldResult"("sessionId", "fieldId");

-- AddForeignKey
ALTER TABLE "ConversationalForm" ADD CONSTRAINT "ConversationalForm_orgId_fkey" FOREIGN KEY ("orgId") REFERENCES "Organization"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FormSession" ADD CONSTRAINT "FormSession_formId_fkey" FOREIGN KEY ("formId") REFERENCES "ConversationalForm"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "FormSession"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FieldResult" ADD CONSTRAINT "FieldResult_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "FormSession"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
