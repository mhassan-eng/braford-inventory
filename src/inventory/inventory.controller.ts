import { InventoryService } from './inventory.service';
import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
// import { CreateBulkInventoryDto } from './dto/create-bulk-inventory.dto';
import { CreateVendorSKUDto } from './dto/creater-vendorSKU.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('inventory')
export class InventoryController {
  constructor(private readonly inventoryService: InventoryService) {}


  @Get()
  getAllInventoryItems(){

    return this.inventoryService.getAllInventoryItems()

  }


 
}
