import { CartItem } from 'src/app/main/sell/models/cart-item';

export interface Sale {
  id: string;
  date: any;
  items: CartItem[];
  status: string;
  amount: number;
  discount: number;
  paymentMethod: string;
  refunded: boolean;
  returned: boolean;
  profit: number;
  payment: number;
  change: number;
  soldBy: Partial<Seller>;
  mPesaCode?: string;
}

interface Seller {
  userId: string;
  userName: string;
  uid: string | null;
  displayName: string | null
}
