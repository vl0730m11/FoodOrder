import { User, UserType, CreditCard, MenuItem } from 'src/app/models/classes';

export interface UserState {
    currentUser: User;
    cards: CreditCard[];
    selectedCard: CreditCard;
    favorites: number[];
    favoriteItems: MenuItem[];
    isLoading: boolean;
    processing: Status;
    userType: UserType;
    error: string;
}

export enum Status {
    NONE = 0,
    PROCESSING = 1,
    SUCCESS = 2,
    ERROR = 3
}