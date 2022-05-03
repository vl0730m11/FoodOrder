import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { RootStoreState, UserStoreActions } from 'src/app/root-store';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { User } from 'src/app/models/classes';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  submitted: boolean = false;
  signupForm: FormGroup;

  get f() { return this.signupForm.controls; }

  constructor(
    private store$: Store<RootStoreState.AppState>,
    private fb: FormBuilder
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
    user.address = formValue.address;
    user.displayName = formValue.name;
    user.email = formValue.email;
    user.mobile = formValue.mobile;
    user.password = formValue.password;

    // this.store$.dispatch(UserStoreActions.signupFirebaseUser({ user }));
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
}
