-- AlterTable
ALTER TABLE "FormSession" ADD COLUMN     "needsReview" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "skippedFields" TEXT[] DEFAULT ARRAY[]::TEXT[];
