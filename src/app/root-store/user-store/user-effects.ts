import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect, act } from '@ngrx/effects';
import { catchError, map, mergeMap, tap, switchMap, withLatestFrom } from 'rxjs/operators';
import { of, Observable, from } from 'rxjs';
import * as UserActions from './user-actions'
// import { LoginService } from 'src/app/services/login.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { User, UserType, CreditCard, MenuItem, FireBaseAuthError, FireBaseUser } from 'src/app/models/classes';
import { AngularFireAuth } from '@angular/fire/auth';
import { RootStoreState } from '..';
import { Store } from '@ngrx/store';
import { AngularFirestore } from '@angular/fire/firestore';
import { UserService } from 'src/app/services/user.service';
import { UserStoreSelectors } from './user-index';
import { NotificationService } from 'src/app/services/notification.service';
import { ThrowStmt } from '@angular/compiler';
import { ModalController } from '@ionic/angular';
import { ModalService } from 'src/app/shared/services/modal.service';
import { SigninComponent } from 'src/app/shared/pages/signin/signin.component';
import { RestaurantStoreActions } from '../restaurant-store/restaurant-index';
import { HttpErrorResponse } from '@angular/common/http';
// import { UserService } from 'src/app/services/user.service';

// import { TimeoutService } from 'src/app/services/timeout.service';

@Injectable()
export class UserStoreEffects {

    constructor(
        private actions$: Actions,
        // private _loginService: LoginService,
        private userService: UserService,
        private authService: AuthService,
        private router: Router,
        private afAuth: AngularFireAuth,
        private afs: AngularFirestore,
        private store$: Store<RootStoreState.AppState>,
        private noti: NotificationService,
        private modalCtrl: ModalController
        // private _timeoutService: TimeoutService
    ) { }

    getUser$ = createEffect(() =>
        this.actions$.pipe(
            ofType(UserActions.loadUser),
            // withLatestFrom(this.store$),
            // switchMap(([action, store]) => {
            switchMap(action => {
                return this.afAuth.authState
                    .pipe(
                        map((firebaseUser: firebase.User) => {
                            // Logged in
                            if (firebaseUser) {
                                const userType = this.userService.getOAuthUserType();

                                let photoUrl = '';

                                if (userType === UserType.FACEBOOK_USER) {
                                    photoUrl = firebaseUser.photoURL + '?type=large';
                                } else if (userType === UserType.GOOGLE_USER) {
                                    photoUrl = firebaseUser.photoURL;
                                }

                                const user = new User();
                                user.displayName = firebaseUser.displayName;
                                user.uid = firebaseUser.uid;
                                user.email = firebaseUser.email;
                                user.emailVerified = firebaseUser.emailVerified;
                                user.photoURL = photoUrl;
                                user.isAnonymous = firebaseUser.isAnonymous;
                                user.providerData = firebaseUser.providerData;
                                user.restaurantId = 1;
                                user.userType = userType;

                                return user;
                            } else {
                                return null;
                            }
                        }),
                        switchMap((firebaseUser: User) => {
                            console.log(firebaseUser);
                            return this.authService.oAuthLogin(firebaseUser).pipe(
                                map((user: User) => {
                                    this.noti.closeLoading();
                                    if (user) {
                                        this.userService.saveUserToSession(user);
                                        this.authService.hasLogin = true;
                                        this.modalCtrl.dismiss({ dismissed: true });
                                        // this.router.navigate(['tabs/home']);
                                        this.store$.dispatch(RestaurantStoreActions.selectBranch({ branchId: user.branchId }));
                                        return UserActions.authenticated({ user });
                                    } else {
                                        if (!firebaseUser) {
                                            // later
                                        } else if (!firebaseUser.emailVerified && firebaseUser.userType === UserType.APP_USER) {
                                            this.noti.showAlert('Activation Required !', 'Please activate your account.');
                                        }
                                        this.authService.hasLogin = false;
                                        return UserActions.notAuthenticated();
                                    }
                                })
                            );
                        }),
                        catchError(error => {
                            this.noti.closeLoading();
                            return of(UserActions.authError({ error }));
                        })
                    );
            })
        )
    );

    signupAppUser$ = createEffect(() =>
        this.actions$.pipe(
            ofType(UserActions.signupAppUser),
            switchMap(action => {
                return this.authService.signupAppUser(action.user)
                    .pipe(
                        map(user => {
                            this.authService.sendVerificationEmail()
                                .then(() => {
                                    this.noti.showAlert(
                                        'Almost done... ',
                                        'We will send an email to ' + user.email + ' shortly.' +
                                        'Click on the link to activate your account.'
                                    );
                                    this.modalCtrl.dismiss({ dismissed: true });
                                    this.router.navigate(['/tabs/home']);
                                })
                                .catch(err => {
                                    this.noti.showAlert('Verification Failure!', 'We cannot send email to ' + user.email);
                                });

                            return UserActions.signupSuccess();
                        }),
                        catchError(error => of(UserActions.signupFailure({ error }))));
            }))
    );

    signupFirebaseUser$ = createEffect(() =>
        this.actions$.pipe(
            ofType(UserActions.signupFirebaseUser),
            switchMap(action => {
                return from(this.authService.register(action.user.email, action.user.password))
                    .pipe(
                        map(result => result.user),
                        switchMap((firebaseUser: firebase.User) => {
                            action.user.uid = firebaseUser.uid;
                            action.user.restaurantId = 1;
                            action.user.userType = UserType.APP_USER;
                            action.user.isAnonymous = firebaseUser.isAnonymous;
                            return this.authService.signupAppUser(action.user);
                        }),
                        catchError((error: FireBaseAuthError) => {
                            this.noti.showAlert('Authentication Failed! ', error.message);
                            return of(UserActions.authError({ error: error.message }));
                        })
                    );
            })
        )
    );


    loginEmail$ = createEffect(() =>
        this.actions$.pipe(
            ofType(UserActions.login),
            switchMap(action => {
                this.noti.presentLoading('Signing you in...');
                return from(this.authService.firebaseLogin(action.username, action.password))
                    .pipe(
                        map(() => UserActions.loadUser()),
                        catchError((error: FireBaseAuthError) => {
                            this.noti.showAlert('Authentication Failed! ', error.message);
                            return of(UserActions.authError({ error: error.message }));
                        }));
            })
        )
    );

    loginGoogle$ = createEffect(() =>
        this.actions$.pipe(
            ofType(UserActions.loginWithGoogle),
            switchMap(action => {
                return from(this.authService.googleSignin())
                    .pipe(
                        map(() => UserActions.loadUser()),
                        catchError(error => of(UserActions.authError({ error })))
                    );
            })
        )
    );

    loginFacebook$ = createEffect(() =>
        this.actions$.pipe(
            ofType(UserActions.loginWithFacebook),
            switchMap(action => {
                return from(this.authService.facebookSignin())
                    .pipe(
                        map(() => UserActions.loadUser()),
                        catchError(error => of(UserActions.authError({ error })))
                    );
            })
        )
    );

    addCard$ = createEffect(() =>
        this.actions$.pipe(
            ofType(UserActions.addCreditCard),
            switchMap(action => {
                this.noti.presentLoading('Please wait...');
                return from(this.userService.addCard(action.card))
                    .pipe(
                        map((newCard: CreditCard) => {
                            this.noti.closeLoading();
                            this.modalCtrl.dismiss({ dismissed: true });
                            return UserActions.addCreditCardSuccess({ newCard });
                        }),
                        catchError((error: HttpErrorResponse) => {
                            this.noti.closeLoading();
                            if (error.error) {
                                this.noti.showAlert('Card Not Added', error.error.detail);
                            } else {
                                this.noti.showAlert('Card Not Added', 'Contact your card issuer for more information.');
                            }
                            return of(UserActions.addCreditCardFailure({ error: error.error.detail }));
                        })
                    );
            })
        )
    );

    removeCard$ = createEffect(() =>
        this.actions$.pipe(
            ofType(UserActions.removeCreditCard),
            switchMap(action => {
                this.noti.presentLoading('Removing card...');
                return from(this.userService.removeCard(action.card))
                    .pipe(
                        map((card: CreditCard) => {
                            this.noti.closeLoading();
                            this.noti.showAlert('Card Removed Success!',
                                'Card ending ' + action.card.cardNumber + ' has been removed.');

                            return UserActions.removeCreditCardSuccess({ card });
                        }),
                        catchError(error => {
                            this.noti.showAlert('Cannot Remove Card', error.error.detail);
                            return of(UserActions.removeCreditCardFailure({ error }));
                        })
                    );
            })
        )
    );

    logout$ = createEffect(() =>
        this.actions$.pipe(
            ofType(UserActions.logout),
            switchMap(action => {
                return from(this.authService.signOut())
                    .pipe(
                        map(() => {
                            this.authService.hasLogin = false;
                            return UserActions.notAuthenticated();
                        }),
                        catchError(error => of(UserActions.authError({ error })))
                    );
            })
        )
    );

    reset$ = createEffect(() =>
        this.actions$.pipe(
            ofType(UserActions.reset),
            tap(() => {
                // this._loginService.reset();
                // this._timeoutService.stopSessionTimer();
                // this._userService.clearCached();
            }),
            map(() => { return { type: UserActions.UserActionTypes.USER_READY } })
        )
    );

    updateFavorites$ = createEffect(() =>
        this.actions$.pipe(
            ofType(UserActions.addFavorite, UserActions.removeFavorite),
            withLatestFrom(this.store$),
            switchMap(([action, store]) => {
                const userId = store.userStore.currentUser ? store.userStore.currentUser.id : 0;
                const favorites = store.userStore.favorites;
                return this.userService.updateFavorites(userId, favorites)
                    .pipe(
                        map((favoriteItems: MenuItem[]) => UserActions.updateFavoritesSuccess({ favoriteItems })),
                        catchError(error => of(UserActions.updateFavoritesFailure({ error })))
                    );
            })
        )
    );

    saveUser$ = createEffect(() =>
        this.actions$.pipe(
            ofType(UserActions.saveUser),
            switchMap(action => {
                return from(this.userService.saveUser(action.user))
                    .pipe(
                        map(() => UserActions.saveUserSuccess({ user: action.user })),
                        catchError(error => of(UserActions.saveUserFailure({ error })))
                    );
            })
        )
    );
    // removeFavorites$ = createEffect(() =>
    //     this.actions$.pipe(
    //         ofType(UserActions.removeFavorite),
    //         withLatestFrom(this.store$),
    //         switchMap(([action, store]) => {
    //             const userId = store.userStore.currentUser.id;
    //             const favorites = store.userStore.favorites;
    //             return this.userService.updateFavorites(userId, favorites)
    //                 .pipe(
    //                     map((favoriteItems: MenuItem[]) => UserActions.updateFavoritesSuccess({ favoriteItems })),
    //                     catchError(error => of(UserActions.updateFavoritesFailure({ error })))
    //                 );
    //         })
    //     )
    // );
}