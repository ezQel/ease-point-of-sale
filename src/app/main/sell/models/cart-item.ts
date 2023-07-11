import { Product } from '../../products/models/product';

export interface CartItem extends Product{
  quantity: number;
  totalPrice: number;
}
