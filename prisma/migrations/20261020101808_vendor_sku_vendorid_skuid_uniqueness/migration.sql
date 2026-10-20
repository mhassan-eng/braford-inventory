/*
  Warnings:

  - A unique constraint covering the columns `[skuId,vendorId]` on the table `VendorSKU` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "VendorSKU_skuId_key";

-- CreateIndex
CREATE UNIQUE INDEX "VendorSKU_skuId_vendorId_key" ON "VendorSKU"("skuId", "vendorId");
