/*
  Warnings:

  - A unique constraint covering the columns `[skuId]` on the table `VendorSKU` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "VendorSKU_skuId_key" ON "VendorSKU"("skuId");
