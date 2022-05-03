import { createSelector } from '@ngrx/store';
import { AppState } from '../state';
import { UserState } from './user-state';

const selectUserFeature = (state: AppState) => {
    return state.userStore
};

export const getUser = createSelector(
    selectUserFeature,
    (state: UserState) => state.currentUser
);

export const getUsername = createSelector(
    selectUserFeature,
    (state: UserState) => state.currentUser.email
);

export const getUserUid = createSelector(
    selectUserFeature,
    (state: UserState) => state.currentUser ? state.currentUser.uid : ''
);

export const isUserLogin = createSelector(
    selectUserFeature,
    (state: UserState) => state.currentUser !== null
);

export const getLoadingStatus = createSelector(
    selectUserFeature,
    (state: UserState) => state.isLoading
);

export const getError = createSelector(
    selectUserFeature,
    (state: UserState) => state.error != null ? state.error['error'] : ''
);

export const getCards = createSelector(
    selectUserFeature,
    (state: UserState) => state.cards
);

export const getSelectedCard = createSelector(
    selectUserFeature,
    (state: UserState) => state.selectedCard ? state.selectedCard : state.cards.length > 0 ? state.cards[0] : null
);

export const getFavoriteItems = createSelector(
    selectUserFeature,
    (state: UserState) => state.favoriteItems
);

export const getFavoriteIds = createSelector(
    selectUserFeature,
    (state: UserState) => state.favorites
);

export const isFavorite = createSelector(
    selectUserFeature,
    (state: UserState, props) => state.favorites.includes(props.itemId)
);

export const getProcessStatus = createSelector(
    selectUserFeature,
    (state: UserState) => state.processing
);
