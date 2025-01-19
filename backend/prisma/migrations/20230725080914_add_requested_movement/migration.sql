-- CreateTable
CREATE TABLE "RequestedMovement" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "skillLevel" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "exerciseId" INTEGER,
    "targetMuscleId" INTEGER,
    "movementPatternId" INTEGER,
    "equipmentId" INTEGER,
    "postedById" INTEGER,

    CONSTRAINT "RequestedMovement_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "RequestedMovement" ADD CONSTRAINT "RequestedMovement_exerciseId_fkey" FOREIGN KEY ("exerciseId") REFERENCES "Exercise"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RequestedMovement" ADD CONSTRAINT "RequestedMovement_targetMuscleId_fkey" FOREIGN KEY ("targetMuscleId") REFERENCES "TargetMuscle"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RequestedMovement" ADD CONSTRAINT "RequestedMovement_movementPatternId_fkey" FOREIGN KEY ("movementPatternId") REFERENCES "MovementPattern"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RequestedMovement" ADD CONSTRAINT "RequestedMovement_equipmentId_fkey" FOREIGN KEY ("equipmentId") REFERENCES "Equipment"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RequestedMovement" ADD CONSTRAINT "RequestedMovement_postedById_fkey" FOREIGN KEY ("postedById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
