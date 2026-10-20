import { Type } from "class-transformer";
import { IsOptional, IsString } from "class-validator";

export class ProductVendorQueryDto{
    @IsOptional()
    @Type(() => String)
    @IsString()
    name!: string
}