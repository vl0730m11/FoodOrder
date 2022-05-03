import { Component, OnInit } from '@angular/core';
import { RootStoreState, UserStoreSelectors } from 'src/app/root-store';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/classes';
import { Router } from '@angular/router';
import { ModalService } from '../../services/modal.service';

@Component({
  selector: 'app-splash',
  templateUrl: './splash.component.html',
  styleUrls: ['./splash.component.scss'],
})
export class SplashComponent implements OnInit {

  user$: Observable<User>;
  constructor(
    private store$: Store<RootStoreState.AppState>,
    private router: Router,
    private modalService: ModalService
  ) {

  }
  ngOnInit() {
    this.user$ = this.store$.select(UserStoreSelectors.getUser);
  }

  goToHome() {
    this.router.navigate(['tabs/home']);
  }

  openSignin() {
    this.modalService.openLogin();
  }
}