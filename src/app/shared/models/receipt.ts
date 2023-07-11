import { CartItem } from '../../main/sell/models/cart-item';
import { PaymentMethod } from './payment-method';

export interface Receipt {
    id: string;
    date: any;
    items: Array<CartItem>;
    status: string;
    amount: number;
    discount: number;
    paymentMethod: PaymentMethod;
    refunded: boolean;
}
