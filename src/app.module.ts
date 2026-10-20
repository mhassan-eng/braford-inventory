import { PrismaModule } from './../prisma/prisma.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { InventoryModule } from './inventory/inventory.module';
import { ProductVendorModule } from './product-vendor/product-vendor.module';
import { PurchaseOrderModule } from './purchase-order/purchase-order.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [ UserModule, PrismaModule, InventoryModule, ProductVendorModule, PurchaseOrderModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
