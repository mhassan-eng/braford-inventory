import { IsDate, IsDateString, IsIn, IsNumber, IsString } from "class-validator";

export class CreatePurchaseOrderDto{
    @IsString()
    deliveryDate!: string
    @IsNumber()
    totalPrice!: number
    // @IsIn(['PENDING', "COMPLETED", "OVERDUE"])
}