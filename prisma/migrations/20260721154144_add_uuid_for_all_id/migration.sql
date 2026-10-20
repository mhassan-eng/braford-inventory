-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('INVENTORY_MANAGER');

-- CreateEnum
CREATE TYPE "Size" AS ENUM ('XS', 'S', 'M', 'L', 'XL', 'XXL');

-- CreateEnum
CREATE TYPE "InventoryItemStatus" AS ENUM ('PENDING_QC', 'AVAILABLE', 'RESERVED', 'IN_TRANSIT', 'DAMAGED_HOLD', 'REJECTED', 'WRITTEN_OFF');

-- CreateEnum
CREATE TYPE "PurchaseOrderStatus" AS ENUM ('COMPLETED', 'PENDING', 'OVERDUE');

-- CreateEnum
CREATE TYPE "PurchaseOrderItemStatus" AS ENUM ('COMPLETED', 'PARTIALLY_COMPLETED', 'PENDING');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "role" "UserRole" NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SKUItem" (
    "id" TEXT NOT NULL,
    "itemName" TEXT NOT NULL,
    "size" "Size" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SKUItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InventoryItem" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "size" "Size" NOT NULL,
    "skuId" TEXT NOT NULL,
    "purchaseOrderId" TEXT,
    "purchaseOrderItemId" TEXT,
    "status" "InventoryItemStatus" NOT NULL DEFAULT 'PENDING_QC',
    "price" INTEGER NOT NULL,

    CONSTRAINT "InventoryItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProductVendors" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "ProductVendors_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VendorSKU" (
    "id" TEXT NOT NULL,
    "vendorId" TEXT NOT NULL,
    "skuId" TEXT NOT NULL,
    "perUnitPrice" INTEGER NOT NULL,

    CONSTRAINT "VendorSKU_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PurchaseOrder" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deliveryDate" TIMESTAMP(3) NOT NULL,
    "productVendorsId" TEXT NOT NULL,
    "totalPrice" INTEGER NOT NULL,
    "status" "PurchaseOrderStatus" DEFAULT 'PENDING',

    CONSTRAINT "PurchaseOrder_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PurchaseOrderItem" (
    "id" TEXT NOT NULL,
    "purchaseOrderId" TEXT NOT NULL,
    "vendorSKUId" TEXT NOT NULL,
    "perUnitPrice" INTEGER NOT NULL,
    "totalQuantity" INTEGER NOT NULL,
    "receivedQuantity" INTEGER NOT NULL DEFAULT 0,
    "status" "PurchaseOrderItemStatus" NOT NULL DEFAULT 'PENDING',

    CONSTRAINT "PurchaseOrderItem_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "InventoryItem_code_key" ON "InventoryItem"("code");

-- CreateIndex
CREATE UNIQUE INDEX "PurchaseOrder_code_key" ON "PurchaseOrder"("code");

-- AddForeignKey
ALTER TABLE "InventoryItem" ADD CONSTRAINT "InventoryItem_skuId_fkey" FOREIGN KEY ("skuId") REFERENCES "SKUItem"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InventoryItem" ADD CONSTRAINT "InventoryItem_purchaseOrderId_fkey" FOREIGN KEY ("purchaseOrderId") REFERENCES "PurchaseOrder"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InventoryItem" ADD CONSTRAINT "InventoryItem_purchaseOrderItemId_fkey" FOREIGN KEY ("purchaseOrderItemId") REFERENCES "PurchaseOrderItem"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VendorSKU" ADD CONSTRAINT "VendorSKU_vendorId_fkey" FOREIGN KEY ("vendorId") REFERENCES "ProductVendors"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VendorSKU" ADD CONSTRAINT "VendorSKU_skuId_fkey" FOREIGN KEY ("skuId") REFERENCES "SKUItem"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PurchaseOrder" ADD CONSTRAINT "PurchaseOrder_productVendorsId_fkey" FOREIGN KEY ("productVendorsId") REFERENCES "ProductVendors"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PurchaseOrderItem" ADD CONSTRAINT "PurchaseOrderItem_purchaseOrderId_fkey" FOREIGN KEY ("purchaseOrderId") REFERENCES "PurchaseOrder"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PurchaseOrderItem" ADD CONSTRAINT "PurchaseOrderItem_vendorSKUId_fkey" FOREIGN KEY ("vendorSKUId") REFERENCES "VendorSKU"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
