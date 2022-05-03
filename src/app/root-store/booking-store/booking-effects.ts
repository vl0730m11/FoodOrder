import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { RootStoreState } from '..';
import { BookingService } from 'src/app/services/booking.service';
import { mergeMap, map, catchError, withLatestFrom } from 'rxjs/operators';
import * as BookingActions from '../booking-store/booking-actions';
import { of, from } from 'rxjs';
import { Booking } from 'src/app/models/booking';
import { getUserUid } from '../user-store/user-selectors';
import { NotificationService } from 'src/app/services/notification.service';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class BookingStoreEffects {
    constructor(
        private actions$: Actions,
        private store$: Store<RootStoreState.AppState>,
        private bookingService: BookingService,
        private notiService: NotificationService
    ) { }


    loadBookingSlots$ = createEffect(() =>
        this.actions$.pipe(
            ofType(BookingActions.loadBookingSlots),
            mergeMap(action =>
                this.bookingService.getBookingSlots(action.branchId, action.date).pipe(
                    map(slots => {
                        return BookingActions.loadBookingSlotsSuccess({ slots });
                    }),
                    catchError(error => {
                        return of(BookingActions.loadBookingSlotsFailure({ error }))
                    })
                )
            )
        )
    );

    loadUserBookings$ = createEffect(() =>
        this.actions$.pipe(
            ofType(BookingActions.loadUserBookings),
            withLatestFrom(this.store$.select(getUserUid)),
            mergeMap(([action, userUid]) =>
                this.bookingService.getUserBookings(userUid).pipe(
                    map(userBookings => {
                        return BookingActions.loadUserBookingsSuccess({ userBookings })
                    }),
                    catchError(error => {
                        return of(BookingActions.loadUserBookingsFailure({ error }))
                    })
                )
            )
        )
    );

    loadAdminBookings$ = createEffect(() =>
        this.actions$.pipe(
            ofType(BookingActions.loadAdminBookings),
            mergeMap(action =>
                this.bookingService.getAdminBookings().pipe(
                    map(adminNewBookings => {
                        return BookingActions.loadAdminBookingsSuccess({ adminNewBookings });
                    }),
                    catchError(error => {
                        return of(BookingActions.loadAdminBookingsFailure({ error }));
                    })
                )
            )
        )
    );

    removeBooking$ = createEffect(() =>
        this.actions$.pipe(
            ofType(BookingActions.remove),
            mergeMap(action =>
                this.bookingService.removeBooking(action.bookingId).pipe(
                    map(res => {
                        return BookingActions.removeSuccess({ bookingId: action.bookingId });
                    }),
                    catchError(error => {
                        if (error.error) {
                            return of(BookingActions.removeFailure({ error }));
                        }
                    })
                )
            )
        )
    );


    cancelBooking$ = createEffect(() =>
        this.actions$.pipe(
            ofType(BookingActions.cancel),
            mergeMap(action =>
                this.bookingService.cancelBooking(action.bookingId).pipe(
                    map(booking => {
                        return BookingActions.cancelSuccess({ booking });
                    }),
                    catchError(error => {
                        if (error.error) {
                            return of(BookingActions.cancelFailure({ error }));
                        }
                    })
                )
            )
        )
    );

    addBooking$ = createEffect(() =>
        this.actions$.pipe(
            ofType(BookingActions.add),
            mergeMap(action => {
                this.notiService.presentLoading('Making reservation...');
                return from(this.bookingService.addBooking(action.userBooking))
                    .pipe(
                        map((userBooking: Booking) => {
                            this.notiService.closeLoading();
                            return BookingActions.addSuccess({ userBooking });
                        }),
                        catchError((res: HttpErrorResponse) => {
                            this.notiService.closeLoading();
                            if (res.error) {
                                this.notiService.showAlert('Cannot make reservation!', res.error.detail);
                                return of(BookingActions.addFailure({ error: res.error.detail }));
                            }
                        })
                    );
            })
        )
    );

    addAdminBooking$ = createEffect(() =>
        this.actions$.pipe(
            ofType(BookingActions.addAdmin),
            mergeMap(action => {
                this.notiService.presentLoading('Creating reservation...');
                return from(this.bookingService.addBooking(action.adminBooking, true))
                    .pipe(
                        map((adminBooking: Booking) => {
                            this.notiService.closeLoading();
                            return BookingActions.addAdminSuccess({ adminBooking });
                        }),
                        catchError((res: HttpErrorResponse) => {
                            this.notiService.closeLoading();
                            if (res.error) {
                                this.notiService.showAlert('Cannot make reservation!', res.error.detail);
                                return of(BookingActions.addAdminFailure({ error: res.error.detail }));
                            }
                        })
                    );
            })
        )
    );

    updateBooking$ = createEffect(() =>
        this.actions$.pipe(
            ofType(BookingActions.update),
            mergeMap(action => {
                this.notiService.presentLoading('Updating reservation...');
                return this.bookingService.updateBooking(action.booking).pipe(
                    map(userBooking => {
                        this.notiService.closeLoading();
                        return BookingActions.updateSuccess({ booking: userBooking });
                    }),
                    catchError(error => {
                        this.notiService.closeLoading();
                        if (error.error) {
                            return of(BookingActions.updateFailure({ error }));
                        }
                    })
                );
            }

            )
        )
    );
}