import { Component, OnInit } from '@angular/core';
import { RootStoreState, UserStoreActions } from 'src/app/root-store';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { SigninComponent } from '../signin/signin.component';
import { SignupComponent } from '../signup/signup.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  constructor(
    private store$: Store<RootStoreState.AppState>,
    private router: Router,
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


  // goToSignup() {
  //   this.close();
  //   this.modalService.openSignup();
  //   // this.router.navigate(['/signup']);
  // }

  // goToSignin() {
  //   this.modalService.openSignin();
  //   // this.router.navigate(['/signin']);
  //   this.close();
  // }


  async goToSignin() {
    this.close();
    const modal = await this.modalCtrl.create({
      component: SigninComponent,
      componentProps: {
      },
      swipeToClose: false
    });

    return await modal.present();
  }

  async goToSignup() {
    this.close();
    const modal = await this.modalCtrl.create({
      component: SignupComponent,
      componentProps: {
      },
      swipeToClose: false
    });

    return await modal.present();
  }

  close() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalCtrl.dismiss({
      dismissed: true
    });
  }
}
