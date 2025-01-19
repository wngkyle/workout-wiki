/*
  Warnings:

  - You are about to drop the column `equipmentId` on the `RequestedMovement` table. All the data in the column will be lost.
  - You are about to drop the column `exerciseId` on the `RequestedMovement` table. All the data in the column will be lost.
  - You are about to drop the column `movementPatternId` on the `RequestedMovement` table. All the data in the column will be lost.
  - You are about to drop the column `targetMuscleId` on the `RequestedMovement` table. All the data in the column will be lost.
  - Added the required column `equipment` to the `RequestedMovement` table without a default value. This is not possible if the table is not empty.
  - Added the required column `exercise` to the `RequestedMovement` table without a default value. This is not possible if the table is not empty.
  - Added the required column `movementPattern` to the `RequestedMovement` table without a default value. This is not possible if the table is not empty.
  - Added the required column `targetMuscle` to the `RequestedMovement` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "RequestedMovement" DROP CONSTRAINT "RequestedMovement_equipmentId_fkey";

-- DropForeignKey
ALTER TABLE "RequestedMovement" DROP CONSTRAINT "RequestedMovement_exerciseId_fkey";

-- DropForeignKey
ALTER TABLE "RequestedMovement" DROP CONSTRAINT "RequestedMovement_movementPatternId_fkey";

-- DropForeignKey
ALTER TABLE "RequestedMovement" DROP CONSTRAINT "RequestedMovement_targetMuscleId_fkey";

-- AlterTable
ALTER TABLE "RequestedMovement" DROP COLUMN "equipmentId",
DROP COLUMN "exerciseId",
DROP COLUMN "movementPatternId",
DROP COLUMN "targetMuscleId",
ADD COLUMN     "equipment" VARCHAR(20) default 'Barbell',
ADD COLUMN     "exercise" VARCHAR(20) default 'Strength',
ADD COLUMN     "movementPattern" VARCHAR(20) default 'Push',
ADD COLUMN     "targetMuscle" VARCHAR(20) default 'Bicep';
