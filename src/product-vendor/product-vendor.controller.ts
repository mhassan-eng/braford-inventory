import { ProductVendorService } from './product-vendor.service';
import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { CreateVendorDto } from './dto/create-vendor.dto';
import { ResponseMessage } from 'common/interceptors/response-message.decorator';
import { ProductVendorQueryDto } from './dto/product-vendor-query.dto';

@Controller('product-vendor')
export class ProductVendorController {
  constructor(private readonly productVendorService: ProductVendorService) {}

  @Get()
  getAllVendors(@Query() productVendorQueryDto:ProductVendorQueryDto) {
    return this.productVendorService.getAllVendors(productVendorQueryDto);
  }

  @Get('detail/:id')
  getVendorDetail(@Param('id') id: string) {
    return this.productVendorService.getSingleVendorDetail(id);
  }

  

  @Post()
  @ResponseMessage('Vendor created successfully')
  createVendor(@Body() createVendorDto: CreateVendorDto) {
    console.log(createVendorDto);
    console.log(createVendorDto);
    return this.productVendorService.createVendor(createVendorDto);
  }
}
