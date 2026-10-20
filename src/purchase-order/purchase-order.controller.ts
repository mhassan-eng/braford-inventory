import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { CreatePurchaseOrderDto } from './dto/create-purchase-order.dto';
import { CreateNewPODto } from './dto/create-new-po.dto';
import { PurchaseOrderService } from './purchase-order.service';
import { GetPurchaseOrdersQueryDto } from './dto/purchase-order-query.dto';
import { CreateInventoryFromPODto } from './dto/create-inventory-from-po.dto';
import { ResponseMessage } from 'common/interceptors/response-message.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RoleGuard } from 'src/auth/guards/role.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { CurrentUser } from 'common/decorators/CurrentUser.decorator';
import {type  AuthenticatedUser } from 'common/types/AuthenticatedUser.interface';

@UseGuards(JwtAuthGuard, RoleGuard)
@Controller('purchase-order')
export class PurchaseOrderController {
  constructor(private readonly purchaseOrderService: PurchaseOrderService) {}

  @Roles('INVENTORY_MANAGER')
  @Get()
  getPurchaseOrders(
    @Query() getPurchaseOrdersQueryDto: GetPurchaseOrdersQueryDto,
    // @CurrentUser('id') user : AuthenticatedUser
  ) {

    return this.purchaseOrderService.getAllPurchaseOrders(
      getPurchaseOrdersQueryDto,
    );
  }

  @Get(':id')
  getPurchaseOrderDetail(@Param('id') id: string) {
    console.log(id);
    return this.purchaseOrderService.getPurchaseOrderDetail(id);
  }

  @Post()
  createPurchaseOrder(@Body() createNewPODto: CreateNewPODto) {
    return this.purchaseOrderService.createNewPurchaseOrder(createNewPODto);
  }

  @ResponseMessage('Inventory Items Created Successfully')
  @Post('create-inventory')
  createInventoryFromPO(
    @Body() createInventoryFromPODto: CreateInventoryFromPODto,
  ) {
    return this.purchaseOrderService.createInventoryFromPO(
      createInventoryFromPODto,
    );
  }
}
