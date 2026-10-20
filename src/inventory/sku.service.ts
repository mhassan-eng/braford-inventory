import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { CreateSKUItemDto } from './dto/create-sku-item.dto';
import { CreateVendorSKUDto } from './dto/creater-vendorSKU.dto';

@Injectable()
export class SKUService {
  constructor(private readonly prisma: PrismaService) {}

  // ***** SKU Services ********
  async getAllSKUs() {
    const skuItems = await this.prisma.sKUItem.findMany({
      orderBy: {
        createdAt: 'asc',
      },
      include: {
        createdBy: true,
        productCode: true,
      },
    });

    return skuItems;
  }

  async createSingleSKU(createSKUItem: CreateSKUItemDto, userId: string) {
    //* Count for SKU Code

    const count = await this.prisma.sKUItem.count();

    const skuItem = await this.prisma.$transaction(async (tx) => {
      // * Product Code Logic

      let productCodeId: string;

      if (createSKUItem.productCodeId) {
        const existingProductCode = await tx.productCode.findFirst({
          where: {
            value: String(createSKUItem.productCodeId),
          },
        });

        if (!existingProductCode) {
          throw new Error('Product code not found');
        }

        productCodeId = existingProductCode.id;
      } else {
        const lastProductCode = await tx.productCode.findFirst({
          orderBy: {
            value: 'desc',
          },
        });

        const newProductCode = await tx.productCode.create({
          data: {
            value: lastProductCode ? `${lastProductCode.value + 1}` : `${1000}`,
          },
        });

        productCodeId = newProductCode.id;
      }

      //** Data
      const item = {
        ...createSKUItem,
        productCodeId: productCodeId,
        code: `SKU-${count + 1}`,
        userId: userId,
      };

      return await tx.sKUItem.create({
        data: item,
        include: {
          productCode: true,
        },
      });
    });

    return skuItem;
  }

  async getSKUWithProductCode(
    id: string,
    search: string,
    group: boolean = false,
  ) {
    console.log(id);
    const skuList = await this.prisma.sKUItem.findMany({
      ...(group && {
        distinct: ['productCodeId'],
      }),

      where: {
        ...(id && { productCodeId: id }),
        itemName: {
          contains: search,
          mode: 'insensitive',
        },
      },
      include: {
        productCode: true,
      },
    });

    console.log(id, skuList);

    return skuList;
  }

  // ***** Vendor SKU Services ********

  async getAllVendorSKUs() {
    const allSKUs = await this.prisma.vendorSKU.findMany();

    return allSKUs;
  }

  async createVendorSKU(createVendorSKUDto: CreateVendorSKUDto) {
    const data = createVendorSKUDto.sku.map((sku) => ({
      vendorId: createVendorSKUDto.vendorId,
      skuId: sku.skuId,
      perUnitPrice: sku.perUnitPrice,
    }));

    const vendorSKU = await this.prisma.vendorSKU.createManyAndReturn({
      data,
    });

    return vendorSKU;
  }

  async getSingleVendorSKUs(id: string) {
    const vendor = await this.prisma.productVendors.findMany({
      where: {
        id: id,
        
      },
      
    });

    if (!vendor) {
      throw new NotFoundException('Vendor does not exist');
    }

    const vendorSKUs = await this.prisma.vendorSKU.findMany({
      where: {
        vendorId: id,
      },
      include:{
        sku: {
          include:{
            productCode: true
          }
        }
      }
    });

    return vendorSKUs;
  }
}
