import { Type } from "class-transformer";
import { IsNumber, IsOptional } from "class-validator";

export class GetPurchaseOrdersQueryDto {
  @Type(() => Number)
  @IsOptional()
  @IsNumber()
  productVendorsId?: string;

  @IsOptional()
  status?: "PENDING" | "COMPLETED" | "OVERDUE";
}