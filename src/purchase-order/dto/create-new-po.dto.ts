import { CreatePurchaseOrderItemDto } from './create-purchase-order-item.dto';
import { IsArray, IsDate, IsDateString, IsNumber, IsString } from "class-validator";

export class CreateNewPODto{
    @IsDateString()
    deliveryDate!: Date

    @IsArray()
    items!: CreatePurchaseOrderItemDto[]

    @IsString()
    productVendorsId!: string

}