/*
  Warnings:

  - You are about to drop the column `postedById` on the `Movement` table. All the data in the column will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `movementPattern` to the `Movement` table without a default value. This is not possible if the table is not empty.
  - Added the required column `targetMuscle` to the `Movement` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Movement" DROP CONSTRAINT "Movement_postedById_fkey";

-- AlterTable
CREATE SEQUENCE movement_id_seq;
ALTER TABLE "Movement" DROP COLUMN "postedById",
ADD COLUMN     "movementPattern" TEXT NOT NULL,
ADD COLUMN     "targetMuscle" TEXT NOT NULL,
ALTER COLUMN "id" SET DEFAULT nextval('movement_id_seq');
ALTER SEQUENCE movement_id_seq OWNED BY "Movement"."id";

-- DropTable
DROP TABLE "User";
