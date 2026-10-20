import { Module } from '@nestjs/common';
import { ProductVendorService } from './product-vendor.service';
import { ProductVendorController } from './product-vendor.controller';
import { InventoryModule } from 'src/inventory/inventory.module';

@Module({
  imports:[InventoryModule],
  providers: [ProductVendorService],
  controllers: [ProductVendorController],
  exports: [ProductVendorService]
})
export class ProductVendorModule {}
