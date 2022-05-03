import { Injectable } from '@angular/core';
import { ToastController, AlertController, LoadingController, ActionSheetController } from '@ionic/angular';
import { CallNumber } from '@ionic-native/call-number/ngx';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  loading: any;

  constructor(
    private toastController: ToastController,
    private alertController: AlertController,
    private loadingCtrl: LoadingController,
    private actionsCtrl: ActionSheetController,
    private callNumber: CallNumber
  ) { }

  async show(msg: string) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000,
      position: 'top',
      color: 'light',
      buttons: [{ icon: 'close-outline' }]
    });

    toast.present();
  }

  async showAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      // subHeader: 'Subtitle',
      message,
      buttons: ['OK']
    });

    await alert.present();
  }

  async presentLoading(message: string) {
    this.loading = await this.loadingCtrl.create({
      cssClass: 'my-custom-class',
      message
      // duration: 2000
    });
    await this.loading.present();

    // const { role, data } = await loading.onDidDismiss();
    // console.log('Loading dismissed!');
  }

  closeLoading() {
    if (this.loading) { this.loading.dismiss(); }
  }

  async confirm(header: string, message: string, slidingItem?) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          handler: () => {
            if (slidingItem) { slidingItem.close(); }
            console.log('confirmed cancel');
            return { data: false };
          }
        }, {
          text: 'Yes',
          handler: () => {
            if (slidingItem) { slidingItem.close(); }
            console.log('confirmed ok');
            return { data: true };
          }
        }
      ]
    });
    await alert.present();

    return alert.onDidDismiss();
  }

  async showPhoneActions(phoneNumber: string, slidingItem?: any) {
    const actionSheet = await this.actionsCtrl.create({
      buttons: [
        {
          text: 'Call ' + phoneNumber,
          icon: 'call',
          handler: () => {
            // window.location.href = '{{\'tel\':{' + phoneNumber + '}';
            console.log('Calling ' + phoneNumber);
            if (slidingItem) { slidingItem.close(); }
            this.callNumber.callNumber(phoneNumber, true)
              .then(res => console.log('Launched dialer!', res))
              .catch(err => console.log('Error launching dialer', err));
          }
        }, {
          text: 'Close',
          // icon: 'close',
          role: 'cancel',
          handler: () => {
            if (slidingItem) { slidingItem.close(); }
          }
        }]
    });
    await actionSheet.present();
  }

}
