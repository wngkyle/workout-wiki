/*
  Warnings:

  - You are about to drop the column `exercise` on the `Movement` table. All the data in the column will be lost.
  - You are about to drop the column `movementPattern` on the `Movement` table. All the data in the column will be lost.
  - You are about to drop the column `targetMuscle` on the `Movement` table. All the data in the column will be lost.
  - Added the required column `Description` to the `Movement` table without a default value. This is not possible if the table is not empty.
  - Added the required column `skillLevel` to the `Movement` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Movement" DROP COLUMN "exercise",
DROP COLUMN "movementPattern",
DROP COLUMN "targetMuscle",
ADD COLUMN     "Description" TEXT NOT NULL,
ADD COLUMN     "skillLevel" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);
