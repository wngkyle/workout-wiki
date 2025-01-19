-- AlterTable
ALTER TABLE "Movement" ADD COLUMN     "postedById" INTEGER;

-- AddForeignKey
ALTER TABLE "Movement" ADD CONSTRAINT "Movement_postedById_fkey" FOREIGN KEY ("postedById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
