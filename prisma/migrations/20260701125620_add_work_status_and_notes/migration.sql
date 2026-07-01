-- CreateEnum
CREATE TYPE "WorkStatus" AS ENUM ('NEW', 'IN_PROGRESS', 'COMPLETED');

-- AlterTable
ALTER TABLE "FormSession" ADD COLUMN     "notes" TEXT,
ADD COLUMN     "workStatus" "WorkStatus" NOT NULL DEFAULT 'NEW';
