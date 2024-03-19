export interface Order {
  id: string;
  totalAmount: number;
  orderItems: OrderItem[];
  paymentMethod: string;
}

export interface OrderItem {
  productId: string;
  quantity: number;
}
