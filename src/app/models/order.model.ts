export interface Order {
  totalAmount: number;
  orderItems: OrderItem[];
  paymentMethod: string;
}

export interface OrderItem {
  productId: string;
  quantity: number;
}
