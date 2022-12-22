export class CartItem {
  constructor(initialData: CartItem) {
    Object.assign(this, initialData);
  }
  name: string;
  quantity: number;
  unitPrice: number;
  subTotal: number;
}