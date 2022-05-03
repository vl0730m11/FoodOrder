import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Restaurant } from '../models/classes';

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {

  constructor(
    private http: HttpClient
  ) { }

  getRestaurant() {
    return this.http.get<Restaurant>(this.restaurantAPI() + '/' + this.getRestaurantId());
  }

  restaurantAPI() {
    return environment.foodApiUrl + '/restaurant';
  }

  getRestaurantId() {
    return 1;
  }
}
