export interface  CreatePurchaseOrderItemInput  {
  vendorSKUId: string;
  totalQuantity: number;
};

export interface CreatePurchaseOrderInput  {
  deliveryDate: Date;
  productVendorsId: string;
  items: CreatePurchaseOrderItemInput[];
};

export interface PurchaseOrderSearchFilters {
    productVendorsId?: string,
    status?: "PENDING" | "COMPLETED" | "OVERDUE" 
    // status?: string 1

}


export interface CreateInventoryFromPOINput{
  purchaseOrderItemId: string
  quantity: number
}