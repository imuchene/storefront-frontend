import { CartItem } from "../models/cart-item.model";
import { Product } from "../models/product.model";

export function countAndGroupLikeItems(products: Product[]): CartItem[] {
  // Get a count of all the products added by the customer
  const counts:any = {};
  products.forEach( product => counts[product.id] = (counts[product.id] || 0) + 1);

  // Remove all duplicate products from the cart

  const uniqueProducts = products.filter((item, pos, self) => self.findIndex(v => v.id === item.id) === pos);
  
  // Create an array of cart items
  const newCartItems: CartItem[] = [];

  for (const product of uniqueProducts){
      const testCartItem = new CartItem({
      id: product.id,
      name: product.name,
      quantity: counts[product.id],
      unitPrice: product.unitPrice,
      subTotal: Number((counts[product.id] * product.unitPrice).toFixed(2))
    });
    newCartItems.push(testCartItem);
  }


 return newCartItems;
}