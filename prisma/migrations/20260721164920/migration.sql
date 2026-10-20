/*
  Warnings:

  - A unique constraint covering the columns `[code]` on the table `SKUItem` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `code` to the `SKUItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `SKUItem` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "SKUItem" ADD COLUMN     "code" TEXT NOT NULL,
ADD COLUMN     "userId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "SKUItem_code_key" ON "SKUItem"("code");

-- AddForeignKey
ALTER TABLE "SKUItem" ADD CONSTRAINT "SKUItem_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
