import { Body, Controller, Get, Param, Post, Query, UseGuards } from '@nestjs/common';
import { CreateSKUItemDto } from './dto/create-sku-item.dto';
import { CurrentUser } from 'common/decorators/CurrentUser.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { SKUService } from './sku.service';
import { CreateVendorSKUDto } from './dto/creater-vendorSKU.dto';

@UseGuards(JwtAuthGuard)
@Controller('sku')
export class SkuController {
  constructor(private readonly skuService: SKUService) {}
  @Get()
  allSKU() {
    return this.skuService.getAllSKUs();
  }

  // @Post('sku')
  // bulkCreateSKUs(@Body() createBulkInventoryDto: CreateBulkInventoryDto, @CurrentUser("id") userId :string) {
  //   return this.inventoryService.createManySKU(createBulkInventoryDto, userId);
  // }
  @Post()
  createSKU(
    @Body() createSKUItemDto: CreateSKUItemDto,
    @CurrentUser('id') userId: string,
  ) {
    return this.skuService.createSingleSKU(createSKUItemDto, userId);
  }

  @Get('sku-list')
  getSKUWithProductCode(@Query('search') search: string, @Query('group') group : boolean, @Query("id") id: string) {
    return this.skuService.getSKUWithProductCode(id, search, group);
  }

   // ****** VendorSKU Controllers *****

  @Get('vendor-sku')
  allVendorSKU() {
    return this.skuService.getAllVendorSKUs();
  }

  @Post('vendor-sku')
  createVendorSKU(@Body() createVendorSKUDto: CreateVendorSKUDto) {
    console.log('Controller Reached');
    return this.skuService.createVendorSKU(createVendorSKUDto);
  }

  @Get('vendor-sku/:id')
  getVendorSKUs(@Param('id') id:string){

    return this.skuService.getSingleVendorSKUs(id)
  }
}
