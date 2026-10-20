    import { IsNumber, IsUUID } from "class-validator";

    export class CreatePurchaseOrderItemDto{
        // @IsUUID()
        // purchaseOrderId!: string
        @IsNumber()
        vendorSKUId!:string
        // @IsNumber()
        // perUnitPrice!: number
        // @IsNumber()
        // productVendorsId!: number

        @IsNumber()
        totalQuantity!: number
        // @IsNumber()
        // receivedQuantity!: number
    }