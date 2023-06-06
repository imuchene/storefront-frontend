export interface Order {
  totalAmount: number;
  orderItems:  OrderItem[];
}

export interface OrderItem {
  productId: string;
  quantity:  number;
}
