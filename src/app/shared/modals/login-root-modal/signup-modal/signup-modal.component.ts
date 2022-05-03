import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { RootStoreState, UserStoreActions } from 'src/app/root-store';
import { ModalController } from '@ionic/angular';
import { UserService } from 'src/app/services/user.service';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/models/classes';

@Component({
  selector: 'app-signup-modal',
  templateUrl: './signup-modal.component.html',
  styleUrls: ['./signup-modal.component.scss'],
})
export class SignupModal implements OnInit {

  submitted: boolean = false;
  signupForm: FormGroup;

  get f() { return this.signupForm.controls; }

  constructor(
    private store$: Store<RootStoreState.AppState>,
    private fb: FormBuilder,
    private modalCtrl: ModalController,
    private userService: UserService,
    private authService: AuthService
  ) {
    this.initForm();
  }

  ngOnInit() {
  }


  signup() {
    this.submitted = true;
    if (this.signupForm.invalid) { return; }
    this.submitted = false;
    const formValue = this.signupForm.value;

    const user = new User();
    user.displayName = formValue.name;
    user.email = formValue.email;
    user.address = formValue.address;
    user.mobile = formValue.mobile;
    user.password = formValue.password;
    // this.authService.register(user.email, user.password)
    //   .then(x => {
    //     const firebaseUser = x.user;
    //     user.uid = firebaseUser.uid;
    //     user.isAnonymous = firebaseUser.isAnonymous;
    //     user.photoURL = 'assets/icon/profile.png';
    //     user.password = '';
    //     user.restaurantId = 1;
    //     user.userType = UserType.APP_USER;

    //     this.store$.dispatch(UserStoreActions.signupAppUser({ user }));
    //   });


    this.store$.dispatch(UserStoreActions.signupFirebaseUser({ user }));
  }

  initForm() {
    this.signupForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      address: ['', [Validators.required, Validators.minLength(8)]],
      mobile: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  close() {
    this.modalCtrl.dismiss({
      dismissed: true
    });
  }
}
