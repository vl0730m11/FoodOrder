import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-email-verification-modal',
  templateUrl: './email-verification-modal.component.html',
  styleUrls: ['./email-verification-modal.component.scss'],
})
export class EmailVerificationModal implements OnInit {

  @Input() email: string = '';

  constructor(
    private modalCtrl: ModalController,
    private authService: AuthService,
    private noti: NotificationService
  ) { }

  ngOnInit() { }


  sendVerifyEmail() {
    this.authService.sendVerificationEmail()
      .then(() => {
        this.noti.showAlert(
          'Verification Email Sent',
          'An email has been sent to ' + this.email + ' .' +
          'Click on the link to activate your account.'
        );
      })
      .catch(err => {
        this.noti.showAlert('Verification Failure!', 'We cannot send email to ' + this.email);
      });
  }

  close() {
    this.modalCtrl.dismiss({
      dismissed: true
    });
  }
}
