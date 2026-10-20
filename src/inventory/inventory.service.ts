import { CreateSKUItemDto } from './dto/create-sku-item.dto';
import { TransactionClient } from './../../generated/prisma/internal/prismaNamespace';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { CreateVendorSKUDto } from './dto/creater-vendorSKU.dto';
import { CreateInventoryInput } from './types/inventory.types';
import { Prisma } from 'generated/prisma/browser';
import { PrismaClient } from 'generated/prisma/client';
import { DbClient } from 'common/types/DbClient.type';

@Injectable()
export class InventoryService {
  constructor(private readonly prisma: PrismaService) {}


  async getAllInventoryItems(){

    const inventoryItems = await this.prisma.inventoryItem.findMany({
      include: {
        sku: true,
        purchaseOrder: {
          include: {
            productVendors: true
          }
        },

      }
    })

    return inventoryItems
  }



  async createInventoryItems(
    inventoryItem: CreateInventoryInput,
    quantity: number = 1,
    prisma: DbClient = this.prisma,
  ) {
    const count = await prisma.inventoryItem.count();

    const items = Array.from({ length: quantity }, (_, index) => ({
      ...inventoryItem,
      code: `ITEM-${count + index + 1}`,
    }));

    const inventoryItems = await this.prisma.inventoryItem.createManyAndReturn({
      data: items,
      include: {
        sku: {
          include: {
            createdBy: true,
          },
        },
      },
    });

    return inventoryItems;
  }


}
