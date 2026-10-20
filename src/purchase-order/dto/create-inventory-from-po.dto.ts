import { IsNumber, IsUUID } from 'class-validator';

export class CreateInventoryFromPODto {
  
  @IsUUID()
  purchaseOrderItemId!: string;
  @IsNumber()
  quantity!: number;
}
