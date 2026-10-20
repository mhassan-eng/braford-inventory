import { Module } from '@nestjs/common';
import { PurchaseOrderController } from './purchase-order.controller';
import { PurchaseOrderService } from './purchase-order.service';
import { InventoryModule } from 'src/inventory/inventory.module';
import { ProductVendorService } from 'src/product-vendor/product-vendor.service';
import { ProductVendorModule } from 'src/product-vendor/product-vendor.module';

@Module({
  controllers: [PurchaseOrderController],
  providers: [PurchaseOrderService],
  imports: [InventoryModule, ProductVendorModule]
})
export class PurchaseOrderModule {}
