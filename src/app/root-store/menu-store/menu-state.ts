import { MenuCategory, MenuItem, ItemIngredient } from 'src/app/models/classes';

export interface MenuState {
    categories: MenuCategory[];
    items: MenuItem[];
    popularItems: MenuItem[];
    seasonalItems: MenuItem[];
    ingredients: ItemIngredient[];
    isLoading: boolean;
    isProcessing: boolean;
    error: string;
}