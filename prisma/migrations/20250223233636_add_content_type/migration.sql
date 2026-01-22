-- CreateEnum
CREATE TYPE "ContentType" AS ENUM ('EVENT', 'POST');

-- AlterTable
ALTER TABLE "content" ADD COLUMN     "type" "ContentType" NOT NULL DEFAULT 'POST';
