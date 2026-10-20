import { PrismaService } from 'prisma/prisma.service';
import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
  UseGuards,
} from '@nestjs/common';
import {
  CreateInventoryFromPOINput,
  CreatePurchaseOrderInput,
  PurchaseOrderSearchFilters,
} from './types/purchase-order.types';
import { InventoryService } from 'src/inventory/inventory.service';
import { CreateInventoryInput } from 'src/inventory/types/inventory.types';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { ProductVendorService } from 'src/product-vendor/product-vendor.service';

@Injectable()
export class PurchaseOrderService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly inventoryService: InventoryService,
    private readonly productVendorService: ProductVendorService,
  ) {}

  async getAllPurchaseOrders(filters: PurchaseOrderSearchFilters) {
    const purchaseOrders = await this.prisma.purchaseOrder.findMany({
      where: {
        ...(filters.productVendorsId && {
          productVendorsId: filters.productVendorsId,
        }),

        ...(filters.status && {
          status: filters.status,
        }),
      },
      include: {
        productVendors: true,
      },
    });

    return purchaseOrders;
  }

  async getPurchaseOrderDetail(id: string) {
    const purchaseOrder = await this.prisma.purchaseOrder.findUnique({
      where: {
        id: id,
      },
      include: {
        productVendors: true,
        purchaseOrderItems: {
          include: {
            
            vendorSKU: {
              include: {
                sku: true,
              },
            }, 
        
          },

        },
      },
    });

    if (!purchaseOrder) throw new NotFoundException('Purchase order not found');

    return purchaseOrder;
  }

  async createNewPurchaseOrder(newPOData: CreatePurchaseOrderInput) {
    //* Adding perUnitPrice to each PO Item From Vendor SKU
    // Adding perUnitPrice to each PO Item From Vendor SKU
    const items = await Promise.all(
      newPOData.items.map(async (item) => {
        const vendorSKU = await this.prisma.vendorSKU.findUnique({
          where: {
            id: item.vendorSKUId,
          },
        });

        if (!vendorSKU) {
          throw new NotFoundException(
            `Vendor SKU Item ${item.vendorSKUId} for the Selected SKU Not Found`,
          );
        }

        return {
          ...item,
          perUnitPrice: vendorSKU.perUnitPrice,
        };
      }),
    );

    //*First Calculating The Total Price Of The Products
    const totalPrice = items.reduce((acc, curr) => {
      const productTotal = curr.perUnitPrice * curr.totalQuantity;

      return acc + productTotal;
    }, 0);

    //* Creating New PO
    const count = await this.prisma.purchaseOrder.count({
      where: {
        productVendorsId: newPOData.productVendorsId
      }
    });

    const vendor = await this.productVendorService.getSingleVendorDetail(
      newPOData.productVendorsId,
    );

    const vendorName = vendor?.name.split(" ")


    const newPO = await this.prisma.purchaseOrder.create({
      data: {
        code: `PO-${vendorName?.[0]}-${count + 1}`,
        deliveryDate: new Date(newPOData.deliveryDate).toISOString(),
        totalPrice: totalPrice,
        productVendorsId: newPOData.productVendorsId,
        purchaseOrderItems: {
          create: items,
        },
      },
    });

    return newPO;
  }

  async createInventoryFromPO(poData: CreateInventoryFromPOINput) {
    //* Validate quantity
    if (!poData.quantity || poData.quantity <= 0) {
      throw new BadRequestException('Quantity must be greater than 0');
    }

    //* Find the PO Item
    const poItem = await this.prisma.purchaseOrderItem.findUnique({
      where: {
        id: poData.purchaseOrderItemId,
      },
      select: {
        vendorSKU: {
          select: {
            sku: true,
            skuId: true,
            perUnitPrice: true,
          },
        },
        totalQuantity: true,
        receivedQuantity: true,
        purchaseOrderId: true,
        id: true,
      },
    });

    //* Ensure PO Item exists
    if (!poItem) {
      throw new NotFoundException('Purchase Order Item not found');
    }

    //* Ensure quantity does not exceed remaining quantity
    if (poItem.receivedQuantity + poData.quantity > poItem.totalQuantity) {
      throw new ForbiddenException(
        'Quantity provided exceeds remaining quantity of this PO Item',
      );
    }

    //* Prepare Items
    const itemData: CreateInventoryInput = {
      name: poItem.vendorSKU.sku.itemName,
      size: poItem.vendorSKU.sku.size,
      skuId: poItem.vendorSKU.skuId,
      purchaseOrderId: poItem.purchaseOrderId,
      purchaseOrderItemId: poItem.id,
      status: 'PENDING_QC',
      price: poItem.vendorSKU.perUnitPrice,
    };

    const status: 'COMPLETED' | 'PARTIALLY_COMPLETED' =
      poItem.totalQuantity - (poData.quantity + poItem.receivedQuantity) === 0
        ? 'COMPLETED'
        : 'PARTIALLY_COMPLETED';

    //* Run Transaction To Execute Item Creation and Update PO Item
    const result = await this.prisma.$transaction(async (tx) => {
      const inventoryItems = await this.inventoryService.createInventoryItems(
        itemData,
        poData.quantity,
        tx,
      );

      const updatedPOItem = await tx.purchaseOrderItem.update({
        where: {
          id: poData.purchaseOrderItemId,
        },
        data: {
          receivedQuantity: {
            increment: poData.quantity,
          },
          status: status,
        },
      });

      return {
        inventoryItems,
        updatedPOItem,
      };
    });

    return result;
  }
}
