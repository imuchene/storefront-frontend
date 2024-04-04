export interface OrderResponse {
  id: string;
  customerId: string;
  totalAmount: number;
  orderItems: OrderItem[];
  paymentStatus: string;
  createdAt: string;
  updatedAt: string;
  clientSecret: string;
  customerName: string;
}

export interface OrderItem {
  productId: string;
  quantity: number;
  orderId: string;
}
