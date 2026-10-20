/*
  Warnings:

  - Added the required column `productCodeId` to the `SKUItem` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "SKUItem" ADD COLUMN     "productCodeId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "ProductCode" (
    "id" TEXT NOT NULL,
    "value" INTEGER NOT NULL,

    CONSTRAINT "ProductCode_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ProductCode_value_key" ON "ProductCode"("value");

-- AddForeignKey
ALTER TABLE "SKUItem" ADD CONSTRAINT "SKUItem_productCodeId_fkey" FOREIGN KEY ("productCodeId") REFERENCES "ProductCode"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
