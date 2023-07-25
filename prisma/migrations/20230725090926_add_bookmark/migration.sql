-- CreateTable
CREATE TABLE "Bookmark" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Bookmark_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_BookmarkToMovement" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Bookmark_userId_key" ON "Bookmark"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "_BookmarkToMovement_AB_unique" ON "_BookmarkToMovement"("A", "B");

-- CreateIndex
CREATE INDEX "_BookmarkToMovement_B_index" ON "_BookmarkToMovement"("B");

-- AddForeignKey
ALTER TABLE "Bookmark" ADD CONSTRAINT "Bookmark_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BookmarkToMovement" ADD CONSTRAINT "_BookmarkToMovement_A_fkey" FOREIGN KEY ("A") REFERENCES "Bookmark"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BookmarkToMovement" ADD CONSTRAINT "_BookmarkToMovement_B_fkey" FOREIGN KEY ("B") REFERENCES "Movement"("id") ON DELETE CASCADE ON UPDATE CASCADE;
