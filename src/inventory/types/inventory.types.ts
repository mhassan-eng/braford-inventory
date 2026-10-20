export type Size = 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL';

type InventoryItemStatus =
  | 'PENDING_QC'
  | 'AVAILABLE'
  | 'RESERVED'
  | 'IN_TRANSIT'
  | 'DAMAGED_HOLD'
  | 'REJECTED'
  | 'WRITTEN_OFF';

export interface CreateInventoryInput {
  name: string;
  size: Size;
  skuId: string;
  purchaseOrderId: string;
  purchaseOrderItemId: string;
  status: InventoryItemStatus;
  price: number;
}


