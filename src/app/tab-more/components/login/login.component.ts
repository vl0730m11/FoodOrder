import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { SigninComponent } from 'src/app/shared/pages/signin/signin.component';
import { SignupComponent } from 'src/app/shared/pages/signup/signup.component';

@Component({
  selector: 'user-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  @Output() loginGoogle = new EventEmitter();
  @Output() loginFacebook = new EventEmitter();

  constructor(
    private router: Router,
    private modalCtrl: ModalController
  ) { }

  ngOnInit() { }

  async goToSignin() {
    const modal = await this.modalCtrl.create({
      component: SigninComponent,
      componentProps: {
      },
      swipeToClose: false
    });

    return await modal.present();
  }

  async goToSignup() {
    const modal = await this.modalCtrl.create({
      component: SignupComponent,
      componentProps: {
      },
      swipeToClose: false
    });

    return await modal.present();
  }
}
