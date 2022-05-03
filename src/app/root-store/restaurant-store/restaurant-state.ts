import { Restaurant, RestaurantBranch } from 'src/app/models/classes';

export class RestaurantState {
    restaurant: Restaurant;
    branches: RestaurantBranch[];
    selectedBranch: RestaurantBranch;
    isLoading: boolean
    error: string
}