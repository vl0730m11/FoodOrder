import { createAction, props } from '@ngrx/store';
import { User, CreditCard, MenuItem } from 'src/app/models/classes';

export enum UserActionTypes {
    FIREBASE_USER_SIGNUP = '[User] Firebase Signup',
    APP_USER_SIGNUP = '[User] App Signup',
    SIGNUP_SUCCESS = '[User] Signup Success',
    SIGNUP_FAILURE = '[User] Signup Failure',

    USER_LOGIN = '[User] Login',
    USER_FACEBOOK_LOGIN = '[User] Facebook Login',
    USER_GOOGLE_LOGIN = '[User] Google Login',

    AUTHENTICATED = '[User] Authenticated',
    NOT_AUTHENTICATED = '[User] Not Authenticated',
    AUTH_ERROR = '[User] Authenticate Error',

    SAVE_USER = '[User] Save',
    SAVE_USER_SUCCESS = '[User] Save Success',
    SAVE_USER_FAILURE = '[User] Save Failure',

    ADD_FAVORITES = '[Favorites] Add',
    REMOVE_FAVORITES = '[Favorites] Remove',
    UPDATE_FAVORITES_SUCCESS = '[Favorites] Updated',
    UPDATE_FAVORITES_FAILURE = '[Favorites] Update Failure',

    ADD_CREDIT_CARD = '[Card] Save',
    ADD_CREDIT_CARD_SUCCESS = '[Card] Save Success',
    ADD_CREDIT_CARD_FAILURE = '[Card] Save Failure',

    REMOVE_CREDIT_CARD = '[Card] Remove',
    REMOVE_CREDIT_CARD_SUCCESS = '[Card] Remove Success',
    REMOVE_CREDIT_CARD_FAILURE = '[Card] Remove Failure',

    GET_USER = '[User] Get',
    GET_CURRENT_USER = '[User] Get Current',
    GET_CURRENT_USER_SUCCESS = '[User] Get Current Success',

    USER_RESET = '[User] Reset',
    USER_READY = '[User] Ready ',

    USER_LOGOUT = '[User] Logout',
    USER_LOGOUT_SUCCESS = '[User] Logout Completed',

    SELECT_CARD = '[Card] Select',
}

export const loadUser = createAction(
    UserActionTypes.GET_USER
)

export const getCurrentUser = createAction(
    UserActionTypes.GET_CURRENT_USER
)

// export const getCurrentUserSuccess = createAction(
//     UserActionTypes.GET_CURRENT_USER_SUCCESS,
//     props<{ user: User }>()
// )

export const addFavorite = createAction(
    UserActionTypes.ADD_FAVORITES,
    props<{ menuItemId: number }>()
)

export const removeFavorite = createAction(
    UserActionTypes.REMOVE_FAVORITES,
    props<{ menuItemId: number }>()
)

export const updateFavoritesSuccess = createAction(
    UserActionTypes.UPDATE_FAVORITES_SUCCESS,
    props<{ favoriteItems: MenuItem[] }>()
)

export const updateFavoritesFailure = createAction(
    UserActionTypes.UPDATE_FAVORITES_FAILURE,
    props<{ error: string }>()
)

export const signupFirebaseUser = createAction(
    UserActionTypes.FIREBASE_USER_SIGNUP,
    props<{ user: User }>()
)

export const signupAppUser = createAction(
    UserActionTypes.APP_USER_SIGNUP,
    props<{ user: User }>()
)

export const signupSuccess = createAction(
    UserActionTypes.SIGNUP_SUCCESS
)

export const signupFailure = createAction(
    UserActionTypes.SIGNUP_FAILURE,
    props<{ error: string }>()
)

export const login = createAction(
    UserActionTypes.USER_LOGIN,
    props<{ username: string, password: string }>()
)

export const loginWithFacebook = createAction(
    UserActionTypes.USER_FACEBOOK_LOGIN
)

export const loginWithGoogle = createAction(
    UserActionTypes.USER_GOOGLE_LOGIN
)

export const authenticated = createAction(
    UserActionTypes.AUTHENTICATED,
    props<{ user: User }>()
)

export const saveUser = createAction(
    UserActionTypes.SAVE_USER,
    props<{ user: User }>()
)

export const saveUserSuccess = createAction(
    UserActionTypes.SAVE_USER_SUCCESS,
    props<{ user: User }>()
)

export const saveUserFailure = createAction(
    UserActionTypes.SAVE_USER_FAILURE,
    props<{ error: string }>()
)

export const addCreditCard = createAction(
    UserActionTypes.ADD_CREDIT_CARD,
    props<{ card: CreditCard }>()
)

export const addCreditCardSuccess = createAction(
    UserActionTypes.ADD_CREDIT_CARD_SUCCESS,
    props<{ newCard: CreditCard }>()
)

export const addCreditCardFailure = createAction(
    UserActionTypes.ADD_CREDIT_CARD_FAILURE,
    props<{ error: string }>()
)

export const removeCreditCard = createAction(
    UserActionTypes.REMOVE_CREDIT_CARD,
    props<{ card: CreditCard }>()
)

export const removeCreditCardSuccess = createAction(
    UserActionTypes.REMOVE_CREDIT_CARD_SUCCESS,
    props<{ card: CreditCard }>()
)

export const removeCreditCardFailure = createAction(
    UserActionTypes.REMOVE_CREDIT_CARD_FAILURE,
    props<{ error: string }>()
)

export const notAuthenticated = createAction(
    UserActionTypes.NOT_AUTHENTICATED
)

export const authError = createAction(
    UserActionTypes.NOT_AUTHENTICATED,
    props<{ error: string }>()
)

export const logout = createAction(
    UserActionTypes.USER_LOGOUT
)

export const reset = createAction(
    UserActionTypes.USER_RESET
)

export const selectCard = createAction(
    UserActionTypes.SELECT_CARD,
    props<{ card: CreditCard }>()
)