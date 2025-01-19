-- AlterTable
ALTER TABLE "Movement" ADD COLUMN     "postedByAdminId" INTEGER;

-- AddForeignKey
ALTER TABLE "Movement" ADD CONSTRAINT "Movement_postedByAdminId_fkey" FOREIGN KEY ("postedByAdminId") REFERENCES "Admin"("id") ON DELETE SET NULL ON UPDATE CASCADE;
