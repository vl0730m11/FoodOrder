import { Action, createReducer, on } from '@ngrx/store';
import * as UserActions from './user-actions';
import { UserState, Status } from './user-state';
import { UserType } from 'src/app/models/classes';
import { dynamicSort } from 'src/app/utils/utils-functions';

export const initialState: UserState = {
    currentUser: null,
    cards: [],
    selectedCard: null,
    favorites: [],
    favoriteItems: [],
    isLoading: false,
    processing: Status.NONE,
    userType: null,
    error: null
}

const _userReducer = createReducer(
    initialState,

    on(UserActions.login, state => ({
        ...state,
        userType: UserType.APP_USER
    })),

    // on(UserActions.getCurrentUserSuccess, (state, { user }) => ({
    //     ...state,
    //     loggedInUser: user
    // })),

    on(UserActions.loadUser, state => ({
        ...state,
        isLoading: true
    })),

    on(UserActions.loginWithFacebook, state => ({
        ...state,
        userType: UserType.FACEBOOK_USER
    })),

    on(UserActions.loginWithGoogle, state => ({
        ...state,
        userType: UserType.GOOGLE_USER
    })),

    on(UserActions.authenticated, (state, { user }) => ({
        ...state,
        currentUser: user,
        cards: user.creditCards,
        selectedCard: user.creditCards.find(c => c.preference === 1),
        favorites: user.favorites,
        favoriteItems: user.favoriteItems,
        isLoading: false,
        error: ''
    })),

    on(UserActions.notAuthenticated, (state) => ({
        ...state,
        isLoading: false,
        currentUser: null
    })),

    on(UserActions.saveUserSuccess, (state, { user }) => ({
        ...state,
        currentUser: user
    })),

    on(UserActions.saveUserFailure, (state, { error }) => ({
        ...state,
        error
    })),

    on(UserActions.addCreditCard, state => ({
        ...state,
        processing: Status.PROCESSING
    })),

    on(UserActions.addCreditCardSuccess, (state, { newCard }) => ({
        ...state,
        cards: state.cards.concat([newCard]).sort(dynamicSort('id')),
        processing: Status.SUCCESS
    })),

    on(UserActions.addCreditCardFailure, (state, { error }) => ({
        ...state,
        error,
        processing: Status.ERROR
    })),

    on(UserActions.removeCreditCard, (state, { card }) => ({
        ...state,
        processing: Status.PROCESSING
    })),

    on(UserActions.removeCreditCardSuccess, (state, { card }) => ({
        ...state,
        cards: state.cards.filter(c => c.id !== card.id),
        processing: Status.SUCCESS
    })),

    on(UserActions.removeCreditCardFailure, (state, { error }) => ({
        ...state,
        error,
        processing: Status.ERROR
    })),

    on(UserActions.addFavorite, (state, { menuItemId }) => ({
        ...state,
        favorites: state.favorites.concat([menuItemId]),
    })),

    on(UserActions.removeFavorite, (state, { menuItemId }) => ({
        ...state,
        favorites: state.favorites.filter(x => x !== menuItemId),
    })),

    on(UserActions.updateFavoritesSuccess, (state, { favoriteItems }) => ({
        ...state,
        favoriteItems,
        favorites: favoriteItems.map(x => x.id)
    })),

    on(UserActions.updateFavoritesFailure, (state, { error }) => ({
        ...state,
        error
    })),

    on(UserActions.selectCard, (state, { card }) => ({
        ...state,
        selectedCard: card
    }))
)

export function userReducer(state: UserState | undefined, action: Action) {
    return _userReducer(state, action);
}