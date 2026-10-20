import { Type } from 'class-transformer';
import { IsEnum, IsIn, IsOptional, IsString } from 'class-validator';

export class CreateSKUItemDto {
  @IsString()
  itemName!: string;
  @IsIn(['XS', 'S', 'M', 'L', 'XL', 'XXL']) 
  size!: 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL';
  @IsOptional()
  @Type(() => Number)
  productCodeId!: string
}
