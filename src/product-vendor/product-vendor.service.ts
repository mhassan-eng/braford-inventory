import { Injectable } from '@nestjs/common';
import { CreateVendorDto } from './dto/create-vendor.dto';
import { PrismaService } from 'prisma/prisma.service';
import { SKUService } from 'src/inventory/sku.service';
import { ProductVendorFilters } from './types/product-vendor.types';

@Injectable()
export class ProductVendorService {
  constructor(private readonly prisma: PrismaService, private readonly skuService:SKUService) {}
  async createVendor(createVendorDto: CreateVendorDto) {
    const newVendor = await this.prisma.productVendors.create({
      data: createVendorDto,
    });

    return newVendor;
  }

  async getAllVendors(filters : ProductVendorFilters) {
    const allVendors = await this.prisma.productVendors.findMany({
        where: {
        ...(filters.name && {
            name: {
                contains: filters.name,
                mode: 'insensitive'
            }
        })
        }
    });

    return allVendors;
  }

  async getSingleVendorDetail(id: string) {
    const singleVendor = await this.prisma.productVendors.findUnique({
      where: {
        id: id,
      },
    });

    return singleVendor;
  }

}
