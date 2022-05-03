import { Order } from 'src/app/models/classes';

export class OrderState {
    adminNewOrders: Order[];
    adminCurrentOrders: Order[];
    userNewOrders: Order[];
    userPastOrders: Order[];
    isLoading: boolean
    isProcessing: boolean
    error: string
}