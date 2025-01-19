/*
  Warnings:

  - Made the column `equipment` on table `RequestedMovement` required. This step will fail if there are existing NULL values in that column.
  - Made the column `exercise` on table `RequestedMovement` required. This step will fail if there are existing NULL values in that column.
  - Made the column `movementPattern` on table `RequestedMovement` required. This step will fail if there are existing NULL values in that column.
  - Made the column `targetMuscle` on table `RequestedMovement` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "RequestedMovement" ALTER COLUMN "equipment" SET NOT NULL,
ALTER COLUMN "equipment" DROP DEFAULT,
ALTER COLUMN "equipment" SET DATA TYPE TEXT,
ALTER COLUMN "exercise" SET NOT NULL,
ALTER COLUMN "exercise" DROP DEFAULT,
ALTER COLUMN "exercise" SET DATA TYPE TEXT,
ALTER COLUMN "movementPattern" SET NOT NULL,
ALTER COLUMN "movementPattern" DROP DEFAULT,
ALTER COLUMN "movementPattern" SET DATA TYPE TEXT,
ALTER COLUMN "targetMuscle" SET NOT NULL,
ALTER COLUMN "targetMuscle" DROP DEFAULT,
ALTER COLUMN "targetMuscle" SET DATA TYPE TEXT;
