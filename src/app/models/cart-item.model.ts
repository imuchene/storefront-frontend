export class CartItem {
  constructor(initialData: CartItem) {
    Object.assign(this, initialData);
  }
  id: string;
  name: string;
  quantity: number;
  unitPrice: number;
  subTotal: number;
}
