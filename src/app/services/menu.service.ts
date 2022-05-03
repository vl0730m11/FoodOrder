import { Injectable } from '@angular/core';
import { MenuItem, ItemIngredient, IngredientCategory, MenuCategory } from '../models/classes';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { RestaurantService } from './restaurant.service';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  // private categories: MenuCategory[] = [
  //   {
  //     id: 1,
  //     title: 'Entree',
  //     imageUrl: 'https://thewoksoflife.com/wp-content/uploads/2015/09/spring-rolls-8-1-500x411.jpg',
  //   },
  //   {
  //     id: 2,
  //     title: 'Main Dishes',
  //     imageUrl: 'https://cdn77-s3.lazycatkitchen.com/wp-content/uploads/2017/09/vegan-chinese-aubergine-800x1200.jpg',
  //   },
  //   {
  //     id: 3,
  //     title: 'Soup',
  //     imageUrl: 'https://cdn77-s3.lazycatkitchen.com/wp-content/uploads/2019/01/vegan-laksa-bowl-800x1200.jpg'
  //   },
  //   {
  //     id: 4,
  //     title: 'Banquet',
  //     imageUrl: 'https://img.evbuc.com/https%3A%2F%2Fcdn.evbuc.com%2Fimages%2F90608903%2F406059855365%2F1%2Foriginal.20200203-105704?w=512&auto=format%2Ccompress&q=75&sharp=10&rect=0%2C34%2C792%2C396&s=b5ebc211b19bdbbd7cd6e8c2289bfeeb',
  //   },
  //   {
  //     id: 5,
  //     title: 'Beverages',
  //     imageUrl: 'data:image/jpeg;base64,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',
  //   }
  // ];
  private ingredients: ItemIngredient[] = [

    {
      id: 1,
      name: 'Soy Chicken',
      category: IngredientCategory.SOY_MEAT,
      price: 3,
      isChecked: false
    },
    {
      id: 2,
      name: 'Soy Beef',
      category: IngredientCategory.SOY_MEAT,
      price: 3,
      isChecked: false
    },
    {
      id: 3,
      name: 'Soy Duck',
      category: IngredientCategory.SOY_MEAT,
      price: 3,
      isChecked: false
    },
    {
      id: 4,
      name: 'Tofu',
      category: IngredientCategory.TOFU,
      price: 3,
      isChecked: false
    },
    {
      id: 5,
      name: 'Broccoli',
      category: IngredientCategory.VEGETABLE,
      price: 2,
      isChecked: false
    },
    {
      id: 6,
      name: 'Carrot',
      category: IngredientCategory.VEGETABLE,
      price: 2,
      isChecked: false
    },
    {
      id: 7,
      name: 'Bok Choy',
      category: IngredientCategory.VEGETABLE,
      price: 2,
      isChecked: false
    },
    {
      id: 8,
      name: 'Bean Sprout',
      category: IngredientCategory.VEGETABLE,
      price: 2
    },
    {
      id: 9,
      name: 'Rice Noodle',
      category: IngredientCategory.NOODLES,
      price: 2,
      isChecked: false
    },
    {
      id: 10,
      name: 'Yellow Noodle',
      category: IngredientCategory.NOODLES,
      price: 2,
      isChecked: false
    },
    {
      id: 11,
      name: 'Rice Vermicelli',
      category: IngredientCategory.NOODLES,
      price: 2,
      isChecked: false
    }
  ];

  // private menuItems: MenuItem[] = [
  //   //#region Entree
  //   {
  //     id: 1,
  //     categoryId: 1,
  //     title: 'Au Lac Spring Rolls',
  //     imageUrl: 'assets/raw-lq/sr-lq.jpg',//'data:image/jpeg;base64,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',
  //     amount: 4,
  //     price: 7.9,
  //     extraPrice: 0,
  //     ingredients: [],
  //     hidden: 0,
  //     unavailable: 0
  //   },
  //   {
  //     id: 2,
  //     categoryId: 1,
  //     title: 'Spring Rolls',
  //     imageUrl: 'assets/raw-lq/sr-lq.jpg',//'https://steamykitchen.com/wp-content/uploads/2012/07/chinese-chicken-egg-rolls-recipe-8473.jpg',
  //     amount: 4,
  //     price: 7.9,
  //     extraPrice: 0,
  //     ingredients: [],
  //     hidden: 0,
  //     unavailable: 0
  //   },
  //   {
  //     id: 3,
  //     categoryId: 1,
  //     title: 'Shredded Tofu Rolls (Rice Paper)',
  //     imageUrl: 'assets/raw-lq/coldroll-lq.jpg',//'https://www.veganricha.com/wp-content/uploads/2018/08/Vegan-Spring-rolls-with-Peanut-Sauce-veganricha-1560-2.jpg',
  //     amount: 2,
  //     price: 6.9,
  //     extraPrice: 0,
  //     ingredients: [],
  //     hidden: 0,
  //     unavailable: 0
  //   },
  //   {
  //     id: 4,
  //     categoryId: 1,
  //     title: 'Fresh Cold Rolls (Rice Paper)',
  //     imageUrl: 'assets/raw-lq/coldroll-lq.jpg',//'https://www.tasteofhome.com/wp-content/uploads/2017/10/Asian-Spring-Rolls_exps29721_CM2043886D08_16_6bC_RMS-696x696.jpg',
  //     amount: 2,
  //     price: 6.9,
  //     extraPrice: 0,
  //     ingredients: [],
  //     hidden: 0,
  //     unavailable: 0
  //   },
  //   {
  //     id: 5,
  //     categoryId: 1,
  //     title: 'Soy Duck Wraps',
  //     imageUrl: 'assets/raw-lq/duck-wrap-lq.jpg',//'https://food-images.files.bbci.co.uk/food/recipes/duckpancakeswithhois_67779_16x9.jpg',
  //     amount: 4,
  //     price: 8.9,
  //     extraPrice: 0,
  //     ingredients: [],
  //     hidden: 0,
  //     unavailable: 0
  //   },
  //   //#endregion
  //   //#region Soup
  //   {
  //     id: 31,
  //     categoryId: 3,
  //     title: 'Laksa (Spicy)',
  //     imageUrl: 'assets/raw-lq/laksa-lq.jpg',//'https://cdn77-s3.lazycatkitchen.com/wp-content/uploads/2019/01/vegan-laksa-bowl-800x1200.jpg',
  //     amount: null,
  //     price: 14.5,
  //     extraPrice: 0,
  //     ingredients: [1, 4, 5, 6, 7, 8, 10, 11],
  //     hidden: 0,
  //     unavailable: 0
  //   },
  //   {
  //     id: 32,
  //     categoryId: 3,
  //     title: 'Pho Soup (Chicken or Beef)',
  //     imageUrl: 'assets/raw-lq/beef-pho-lq.jpg',//'https://www.deliciouseveryday.com/wp-content/uploads/Vegan-Pho-1-7-600x600.jpg',
  //     amount: null,
  //     price: 13.9,
  //     extraPrice: 0,
  //     ingredients: [1, 2, 3, 4, 5, 6, 7, 8, 9],
  //     hidden: 0,
  //     unavailable: 0
  //   },
  //   {
  //     id: 33,
  //     categoryId: 3,
  //     title: 'Soy Pork Rice Noodle (Dry/Soup)',
  //     imageUrl: 'https://healthynibblesandbits.com/wp-content/uploads/2018/09/Ginger-Miso-Noodle-Soup-1.jpg',
  //     amount: null,
  //     price: 13.9,
  //     extraPrice: 0,
  //     ingredients: [1, 2, 3, 4, 5, 6, 7, 8, 9],
  //     hidden: 0,
  //     unavailable: 0
  //   },
  //   {
  //     id: 34,
  //     categoryId: 3,
  //     title: 'Yellow Noodle Soup (Chicken or Duck)',
  //     imageUrl: 'https://healthynibblesandbits.com/wp-content/uploads/2018/09/Ginger-Miso-Noodle-Soup-1.jpg',
  //     amount: null,
  //     price: 13.9,
  //     extraPrice: 0,
  //     ingredients: [1, 2, 3, 4, 5, 6, 7, 8, 9],
  //     hidden: 0,
  //     unavailable: 0
  //   },
  //   {
  //     id: 35,
  //     categoryId: 3,
  //     title: 'Royal Noodle Soup (Spicy)',
  //     imageUrl: 'https://healthynibblesandbits.com/wp-content/uploads/2018/09/Ginger-Miso-Noodle-Soup-1.jpg',
  //     amount: null,
  //     price: 13.9,
  //     extraPrice: 0,
  //     ingredients: [1, 2, 3, 4, 5, 6, 7, 8, 9],
  //     hidden: 0,
  //     unavailable: 0
  //   },
  //   {
  //     id: 36,
  //     categoryId: 3,
  //     title: 'Wonton Yellow Noodle Soup',
  //     imageUrl: 'https://healthynibblesandbits.com/wp-content/uploads/2018/09/Ginger-Miso-Noodle-Soup-1.jpg',
  //     amount: null,
  //     price: 13.9,
  //     extraPrice: 0,
  //     ingredients: [1, 2, 3, 4, 5, 6, 7, 8, 9],
  //     hidden: 0,
  //     unavailable: 0
  //   },
  //   {
  //     id: 37,
  //     categoryId: 3,
  //     title: 'Rice Vermicelli Salad',
  //     imageUrl: 'https://healthynibblesandbits.com/wp-content/uploads/2018/09/Ginger-Miso-Noodle-Soup-1.jpg',
  //     amount: null,
  //     price: 13.9,
  //     extraPrice: 0,
  //     ingredients: [1, 2, 3, 4, 5, 6, 7, 8, 9],
  //     hidden: 0,
  //     unavailable: 0
  //   },

  //   //#endregion
  //   //#region Main
  //   {
  //     id: 21,
  //     categoryId: 2,
  //     title: 'Eggplant In Claypot',
  //     imageUrl: 'assets/raw-lq/eggplant-in-claypot-lq.jpg',//'https://food-images.files.bbci.co.uk/food/recipes/duckpancakeswithhois_67779_16x9.jpg',
  //     amount: null,
  //     price: 18.9,
  //     extraPrice: 0,
  //     ingredients: [],
  //     hidden: 0,
  //     unavailable: 0
  //   },
  //   {
  //     id: 21,
  //     categoryId: 2,
  //     title: 'Abalone Mushroom & Snowpeas',
  //     imageUrl: 'assets/raw-lq/abalone-mushrooms-and-snow-peas-lq.jpg',//'https://food-images.files.bbci.co.uk/food/recipes/duckpancakeswithhois_67779_16x9.jpg',
  //     amount: null,
  //     price: 18.9,
  //     extraPrice: 0,
  //     ingredients: [],
  //     hidden: 0,
  //     unavailable: 0
  //   },
  //   //#endregion
  // ];

  constructor(
    private http: HttpClient,
    private restaurantService: RestaurantService
  ) { }

  getAllCategories() {
    return this.http.get<MenuCategory[]>(this.menuAPI() + '/' + this.restaurantId() + '/categories');
  }

  getAllMenuItems() {
    return this.http.get<MenuItem[]>(this.menuAPI() + '/' + this.restaurantId() + '/items');
    // return of(this.menuItems);
  }

  getIngredients() {
    return this.http.get<ItemIngredient[]>(this.menuAPI() + '/' + this.restaurantId() + '/ingredients');
    // return of(this.ingredients);
  }

  // getCategory(categoryId: number) {
  //   return of(this.categories.find(c => c.id === categoryId));
  // }

  getCategoryMenuItems(categoryId: number) {
    return this.http.get<MenuItem[]>(this.menuAPI() + '/' + this.restaurantId() + '/categories/' + categoryId + '/items');
  }

  reorderCategories(categories: MenuCategory[]) {
    return this.http.post<MenuCategory[]>(this.menuAPI() + '/' + this.restaurantId() + '/categories/reorder', categories);
  }

  getPopularItems() {
    return this.http.get<MenuItem[]>(this.menuAPI() + '/' + this.restaurantId() + '/popular-items');
  }

  getSeasonalItems() {
    return this.http.get<MenuItem[]>(this.menuAPI() + '/' + this.restaurantId() + '/seasonal-items');
  }

  // getMenuItem(itemId) {
  //   return of(this.menuItems.find(c => c.id === itemId));
  // }

  getItemIngredients(ids: number[]) {
    return []; // this.ingredients.filter(i => ids.includes(i.id));
  }

  saveItem(item: MenuItem) {
    return this.http.post<MenuItem>(this.menuAPI() + '/' + this.restaurantId() + '/save-item', item);
  }

  updatePriceBatch(percentage: number) {
    return this.http.post<MenuItem[]>(this.menuAPI() + '/' + this.restaurantId() + '/update-prices/' + percentage, null);
    // this.menuItems.filter(i => i.price = Math.round((i.price + i.price * percentage / 100) * 10) / 10);
    // return of(this.menuItems);
  }

  importMenuItems(items: MenuItem[]) {
    return this.http.post<MenuItem[]>(this.menuAPI() + '/' + this.restaurantId() + '/import-items', items);
  }

  importCategories(categories: MenuCategory[]) {
    return this.http.post<MenuCategory[]>(this.menuAPI() + '/' + this.restaurantId() + '/import-categories', categories);
  }

  menuAPI() {
    return environment.foodApiUrl + '/menu';
  }

  restaurantId() {
    return this.restaurantService.getRestaurantId();
  }
}
