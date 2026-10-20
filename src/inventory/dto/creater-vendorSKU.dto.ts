import { Type } from 'class-transformer';
import { IsArray, IsNumber, IsUUID, ValidateNested } from 'class-validator';

class SKU {
  @IsUUID()
  skuId!: string;

  @IsNumber()
  perUnitPrice!: number;
}

export class CreateVendorSKUDto {
  @IsUUID()
  vendorId!: string;

  @IsUUID()
  productCodeId!: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => SKU)
  sku!: SKU[];
}
