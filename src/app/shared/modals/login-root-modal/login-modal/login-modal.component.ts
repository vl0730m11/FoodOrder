import { Component, OnInit } from '@angular/core';
import { RootStoreState, UserStoreActions } from 'src/app/root-store';
import { Store } from '@ngrx/store';
import { ModalController } from '@ionic/angular';
import { SigninModal } from '../signin-modal/signin-modal.component';
import { SignupModal } from '../signup-modal/signup-modal.component';

@Component({
  selector: 'app-login-modal',
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.scss'],
})
export class LoginModal implements OnInit {

  constructor(
    private store$: Store<RootStoreState.AppState>,
    private modalCtrl: ModalController
  ) { }

  ngOnInit() { }


  loginGoogle() {
    this.store$.dispatch(UserStoreActions.loginWithGoogle());
    this.close();
  }

  loginFacebook() {
    this.store$.dispatch(UserStoreActions.loginWithFacebook());
    this.close();
  }

  async goToSignin() {
    const nav = document.querySelector('ion-nav');
    nav.push(SigninModal);
  }

  async goToSignup() {
    const nav = document.querySelector('ion-nav');
    nav.push(SignupModal);
  }

  close() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalCtrl.dismiss({
      dismissed: true
    });
  }
}
