import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { User, CreditCard, UserType, MenuItem } from '../models/classes';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private readonly USER_TYPE = 'USER_TYPE';
  private readonly APP_USER = 'AULAC_APP_USER';

  isAdmin: boolean = true;

  constructor(
    private http: HttpClient
  ) { }

  saveUser(user: User) {
    // return this.db.collection('users').doc(user.uid).set({
    //   uid: user.uid,
    //   email: user.email,
    //   photoURL: user.photoURL,
    //   displayName: user.displayName,
    //   mobile: user.mobile,
    //   address: user.address,
    //   creditCards: [],
    //   favorites: [],
    //   userRole: 1
    // }, { merge: true });

    return this.http.put<User>(this.userAPI() + '/update-user', user);
  }

  addCard(card: CreditCard) {
    return this.http.post<CreditCard>(this.userAPI() + '/credit-card/add', card);
  }

  removeCard(card: CreditCard) {
    return this.http.post<CreditCard>(this.userAPI() + '/credit-card/remove', card);
  }

  updateFavorites(userId: number, favorites: number[]) {
    if (!userId) { return; }

    return this.http.put<MenuItem[]>(this.userAPI() + '/' + userId + ' /update-favorites', favorites);
  }

  userAPI() {
    return environment.foodApiUrl + '/user';
  }

  getOAuthUserType() {
    return sessionStorage.getItem(this.USER_TYPE);
  }

  saveOAuthUserType(userType: UserType) {
    sessionStorage.setItem(this.USER_TYPE, userType);
  }

  removeOAuthUserType() {
    sessionStorage.removeItem(this.USER_TYPE);
  }

  getUserFromSession(): User {
    const user = JSON.parse(sessionStorage.getItem(this.APP_USER));
    console.log('SESSION');
    console.log(user);
    return user;
  }

  saveUserToSession(user: User) {
    sessionStorage.setItem(this.APP_USER, JSON.stringify(user));
  }

  removeUserFromSession() {
    sessionStorage.removeItem(this.APP_USER);
  }
}
