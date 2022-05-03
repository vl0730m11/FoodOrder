import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { RootStoreState, UserStoreActions } from 'src/app/root-store';
import { Store } from '@ngrx/store';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
})
export class SigninComponent implements OnInit {

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
