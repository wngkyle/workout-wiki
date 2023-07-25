/*
  Warnings:

  - You are about to drop the `Bookmark` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Equipment` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Exercise` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Movement` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `MovementPattern` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `RequestedMovement` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TargetMuscle` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_BookmarkToMovement` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Bookmark" DROP CONSTRAINT "Bookmark_userId_fkey";

-- DropForeignKey
ALTER TABLE "Movement" DROP CONSTRAINT "Movement_equipmentId_fkey";

-- DropForeignKey
ALTER TABLE "Movement" DROP CONSTRAINT "Movement_exerciseId_fkey";

-- DropForeignKey
ALTER TABLE "Movement" DROP CONSTRAINT "Movement_movementPatternId_fkey";

-- DropForeignKey
ALTER TABLE "Movement" DROP CONSTRAINT "Movement_targetMuscleId_fkey";

-- DropForeignKey
ALTER TABLE "RequestedMovement" DROP CONSTRAINT "RequestedMovement_equipmentId_fkey";

-- DropForeignKey
ALTER TABLE "RequestedMovement" DROP CONSTRAINT "RequestedMovement_exerciseId_fkey";

-- DropForeignKey
ALTER TABLE "RequestedMovement" DROP CONSTRAINT "RequestedMovement_movementPatternId_fkey";

-- DropForeignKey
ALTER TABLE "RequestedMovement" DROP CONSTRAINT "RequestedMovement_targetMuscleId_fkey";

-- DropForeignKey
ALTER TABLE "RequestedMovement" DROP CONSTRAINT "RequestedMovement_userId_fkey";

-- DropForeignKey
ALTER TABLE "_BookmarkToMovement" DROP CONSTRAINT "_BookmarkToMovement_A_fkey";

-- DropForeignKey
ALTER TABLE "_BookmarkToMovement" DROP CONSTRAINT "_BookmarkToMovement_B_fkey";

-- DropTable
DROP TABLE "Bookmark";

-- DropTable
DROP TABLE "Equipment";

-- DropTable
DROP TABLE "Exercise";

-- DropTable
DROP TABLE "Movement";

-- DropTable
DROP TABLE "MovementPattern";

-- DropTable
DROP TABLE "RequestedMovement";

-- DropTable
DROP TABLE "TargetMuscle";

-- DropTable
DROP TABLE "_BookmarkToMovement";
