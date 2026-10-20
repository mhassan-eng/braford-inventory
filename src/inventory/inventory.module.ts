import { Module } from '@nestjs/common';
import { InventoryController } from './inventory.controller';
import { InventoryService } from './inventory.service';
import { SkuController } from './sku.controller';
import { SKUService } from './sku.service';

@Module({
  controllers: [InventoryController, SkuController],
  providers: [InventoryService, SKUService],
  exports: [InventoryService, SKUService],
})
export class InventoryModule {}
