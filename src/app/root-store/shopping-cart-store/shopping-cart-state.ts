import { ShoppingCart, CartItem, Order, OrderStatus } from 'src/app/models/classes';

export interface ShoppingCartState {
    cart: ShoppingCart;
    cartItems: CartItem[];
    cartPrice: number;
    // orders: Order[]; // History & Upcoming
    // currentOrderStatus: OrderStatus;
    isProcessing: boolean;
    // isLoading: boolean;
    error: string;
}