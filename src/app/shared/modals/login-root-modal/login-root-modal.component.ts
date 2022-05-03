import { Component } from '@angular/core';
import { LoginModal } from './login-modal/login-modal.component';

@Component({
  selector: 'app-login-root-modal',
  templateUrl: './login-root-modal.component.html',
  styleUrls: ['./login-root-modal.component.scss'],
})
export class LoginRootModal {

  root = LoginModal;
}
