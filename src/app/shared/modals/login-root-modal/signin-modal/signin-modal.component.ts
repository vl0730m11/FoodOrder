import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { RootStoreState, UserStoreActions } from 'src/app/root-store';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-signin-modal',
  templateUrl: './signin-modal.component.html',
  styleUrls: ['./signin-modal.component.scss'],
})
export class SigninModal implements OnInit {

  submitted: boolean = false;
  signinForm: FormGroup;

  get f() { return this.signinForm.controls; }

  constructor(
    private store$: Store<RootStoreState.AppState>,
    private fb: FormBuilder,
    private modalCtrl: ModalController
  ) {
    this.initForm();
  }

  ngOnInit() {
  }


  initForm() {
    this.signinForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  signin() {
    this.submitted = true;
    if (this.signinForm.invalid) { return; }
    this.submitted = false;
    const formValue = this.signinForm.value;
    this.store$.dispatch(UserStoreActions.login({ username: formValue.email, password: formValue.password }));
  }

  close() {
    this.modalCtrl.dismiss({
      dismissed: true
    });
  }
}
