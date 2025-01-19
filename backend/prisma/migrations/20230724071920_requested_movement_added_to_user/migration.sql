/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `RequestedMovement` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "RequestedMovement" ADD COLUMN     "userId" INTEGER;

-- CreateIndex
CREATE UNIQUE INDEX "RequestedMovement_userId_key" ON "RequestedMovement"("userId");

-- AddForeignKey
ALTER TABLE "RequestedMovement" ADD CONSTRAINT "RequestedMovement_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
