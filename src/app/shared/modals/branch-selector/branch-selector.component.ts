import { Component, OnInit } from '@angular/core';
import { RootStoreState, RestaurantStoreSelectors, RestaurantStoreActions } from 'src/app/root-store';
import { Store } from '@ngrx/store';
import { ModalController } from '@ionic/angular';
import { Observable, combineLatest } from 'rxjs';
import { RestaurantBranch } from 'src/app/models/classes';
import { map } from 'rxjs/operators';
import * as moment from 'moment';
import { deepCopy } from 'src/app/utils/utils-functions';

@Component({
  selector: 'app-branch-selector',
  templateUrl: './branch-selector.component.html',
  styleUrls: ['./branch-selector.component.scss'],
})
export class BranchSelectorModal implements OnInit {

  branches$: Observable<RestaurantBranch[]>;
  constructor(
    private store$: Store<RootStoreState.AppState>,
    private modalCtrl: ModalController,
  ) { }

  ngOnInit() {
    this.branches$ = combineLatest([
      this.store$.select(RestaurantStoreSelectors.getSelectedBranch),
      this.store$.select(RestaurantStoreSelectors.getBranches)])
      .pipe(
        map(([selectedBranch, branches]) => {
          return branches.map(branch => {
            const b = deepCopy(branch);
            if (!selectedBranch) {
              selectedBranch = branches[0];
            }

            b.isSelected = selectedBranch.id === b.id ? true : false;
            const now = moment(new Date(), 'h:mm');
            const closeAt = moment(b.closeAt, 'h:mm A');
            const openAt = moment(b.openAt, 'h:mm A');
            const closeAt2 = moment(b.closeAt2, 'h:mm A');
            const openAt2 = moment(b.openAt2, 'h:mm A');

            if (b.openAt2) {
              if (now.isAfter(openAt) && now.isBefore(closeAt) || now.isAfter(openAt2) && now.isBefore(closeAt2)) {
                b.isClosed = false;
              } else {
                b.isClosed = true;
              }
            } else {
              if (now.isAfter(openAt) && now.isBefore(closeAt)) {
                b.isClosed = false;
              } else {
                b.isClosed = true;
              }
            }

            return b;
          });
        })
      );
  }

  close() {
    this.modalCtrl.dismiss({
      dismissed: true
    });
  }

  onSelectBranch(branch: RestaurantBranch) {
    // if (!branch || branch.isClosed) { return; }

    this.store$.dispatch(RestaurantStoreActions.selectBranch({ branchId: branch.id }));

    this.modalCtrl.dismiss(branch);
  }
}
