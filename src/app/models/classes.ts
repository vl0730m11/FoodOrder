export class MenuItem {
    id: number = 0;
    categoryId: number = 0;
    title: string = '';
    imageUrl: string = 'assets/icon/unavailable.png';
    options: string[];
    selectedOption: string = '';
    amount?: number = 0;
    oldPrice?: number = 0;
    price: number = 0;
    extraPrice: number = 0;
    ingredients: number[] = [];
    // hidden: number = 0;
    unavailable: number = 0;
    extras?: string[] = []; // set client side
    removes?: string[] = []; // set client side
    restaurantId?: number = 0;
    isSeasonal: number = 0;
    hidden: number = 0;
    isSpicy: number = 0;
}

export class ItemIngredient {
    id: number = 0;
    name: string = '';
    category: IngredientCategory;
    price: number = 0;
    isChecked?: boolean = false;
}

export class MenuCategory {
    id: number = 0;
    title: string = '';
    imageUrl: string = '';
    restaurantId: number = 0;
    displayOrder: number = 0;
}

export enum IngredientCategory {
    SOY_MEAT = 1,
    TOFU = 2,
    VEGETABLE = 3,
    NOODLES = 4
}

export class ShoppingCart {
    cartItems: CartItem[] = [];
    get cartPrice() {
        let totalPrice = 0;
        this.cartItems.forEach(i => totalPrice += i.itemPrice);
        return totalPrice;
    }
}

export class CartItem {
    id: number;
    item: MenuItem = new MenuItem();
    amount: number = 0;
    get itemPrice() {
        return (this.item.price + (this.item.extraPrice ? this.item.extraPrice : 0)) * this.amount;
    }
}

export class Order {
    id: number = 0;
    cartItems: CartItem[] = [];
    // items: OrderItem[] = [];
    orderType: OrderType = OrderType.PICKUP;
    orderPrice: number = 0;
    deliveryPrice: number = 0;
    tips?: number = 0;
    createdOn: Date
    modifiedOn: Date
    status: OrderStatus = OrderStatus.NONE;// 1: COMPLETE/ 0: INCOMPLETE(paid but not delivered)
    customer: CustomerSummary;
    restaurantId?: number = 1;
    branchId?: number = 0;
    // customerId?: string = ''
    // customerName: string = ''
    // customerAddress: string = ''
    // customerMobile: string = ''
    hidden?: number = 0;
    orderNote?: string = '';
    deliveryNote?: string = '';
    deliveryTime?: string; /// = new Date();
    showDetails: boolean = false; // set client
    lastModifiedBy: string = '';
}

export class OrderItem {
    id: number = 0;
    orderId: number = 0;
    menuItemId: number = 0;
    title: string = '';
    price: number = 0;
    extraPrice: number = 0;
    extras: string[] = [];
    removes: string[] = [];
    amount: number = 0
}

export enum OrderStatus {
    CANCELLED = -1,
    NONE = 0,
    PREPARING = 1,
    READY = 2,
    DELIVERING = 3,
    COMPLETE = 4
}

export enum OrderType {
    PICKUP = 1,
    DELIVERY = 2
}

export class FireBaseUser {
    uid: string;
    email: string;
    photoURL: string;
    displayName?: string;
    emailVerified?: boolean;
    isAnonymous?: boolean;
    providerData: any;
}

export class User extends FireBaseUser {
    id: number = 0;
    mobile: string = '';
    address: string = '';
    creditCards: CreditCard[] = [];
    favorites: number[] = [];
    favoriteItems: MenuItem[] = [];
    userRole: UserRole = 1;
    restaurantId: number = 0;
    branchId: number = 0;
    userType: string = '';
    password: string = '';
    stripeId: string = '';
}

export class CustomerSummary {
    id: string = '';
    email: string = '';
    address1: string = '';
    address2?: string = '';
    address3?: string = '';
    name: string = '';
    mobile: string = '';
    creditCard: string = '';
    imageUrl: string = '';
    stripeId: string = '';
}

export enum UserRole {
    STANDARD_USER = 1,
    STAFF = 2,
    ADMIN = 3,
    SUPER_ADMIN = 4
}

export enum UserType {
    APP_USER = 'APP_USER',
    FACEBOOK_USER = 'FACEBOOK',
    GOOGLE_USER = 'GOOGLE'
}

export class MenuItemUpload {
    id: number = 0;
    categoryId: number = 0;
    categoryLabel: string = '';
    title: string = '';
    oldPrice: number = 0;
    price: number = 0;
    imageUrl: string = '';
    restaurantId: number = 0;
}

export class FieldInfo {
    constructor(public label: string, public value: string) { }
}

export const MenuItemUploadTemplate = [
    new FieldInfo('Id', 'id'),
    new FieldInfo('Category Id', 'categoryId'),
    new FieldInfo('Category Label', 'categoryLabel'),
    new FieldInfo('Title', 'title'),
    new FieldInfo('Old Price', 'oldPrice'),
    new FieldInfo('Price', 'price'),
    new FieldInfo('ImageUrl', 'imageUrl'),
    new FieldInfo('Restaurant Id', 'restaurantId')
];

export class KendoGridColumn {
    name: string // to set column header title
    prop: string // to set field name
    width?: number // to set column width
    dataType: Type // to set column data type
    hidden?: boolean = false // to show /hide column in the grid
    isChildList?: boolean = false // to set if this is child list item
    isFilterable?: boolean = false; // to allow apply search filter
    filterType?: string = 'text'; // to allow apply filter type "text", "date", "boolean", "numeric"
    format?: string = '{0:c}'; // to set format for input
    media?: string = 'md'; // to set format for input

}

export enum Type {
    STRING = 'string',
    NUMBER = 'number',
    DATE = 'date',
    IMAGE = 'picture'
}

export class CreditCard {
    id: string = '';
    userId: number = 0;
    uid: string = '';
    stripeId: string = '';
    provider: CardProvider = CardProvider.MASTER;
    cardHolder: string = '';
    cardNumber: string = '';
    expiryMonth: number = 0;
    expiryYear: number = 0;
    cvc: number = 0;
    preference: number = 0;
    hidden: number = 0;
    isExpired: boolean = false;
    isSelected: boolean = false; // set front end
}

export enum CardProvider {
    AMEX = 'AMEX',
    VISA = 'VISA',
    MASTER = 'MASTER'
}

export class Restaurant {
    id: number = 0;
    name: string = '';
    address: string = '';
    logoUrl: string = '';
    branches: RestaurantBranch[] = [];
}

export class RestaurantBranch {
    id: number = 0;
    branchName: string = '';
    address: string = '';
    telephone: string = '';
    suburb: string = '';
    state: string = '';
    postcode: string = '';
    closeAt: string = '';
    openAt: string = '';
    closeAt2: string = '';
    openAt2: string = '';
    logoUrl: string = '';
    restaurantId: number = 0;
    isSelected: boolean = false; // set front end
    isClosed: boolean = false; // set front end
}

export class Timer {
    constructor(
        public from: string = '0',
        public to: string = '0',
        public period: string = 'am'
    ) { }
}

export enum DeliveryOption {
    OTHER = -1,
    NONE = 0,
    LEAVE_AT_DOOR = 1,
    MEET_AT_DOOR = 2,
    MEET_OUTSIDE = 3
}

export class FireBaseAuthError {
    code: string;
    message: string;
}

export enum BookingConditions {
    MAX_CAPACITY = 10,
    TIME_INTERVAL = 1800 //30mins
}