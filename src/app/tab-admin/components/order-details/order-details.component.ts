import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Order } from 'src/app/models/classes';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss'],
})
export class OrderDetailsComponent implements OnInit {

  @Input() order: Order = new Order();
  total: number = 0;

  constructor(
    private modalCtrl: ModalController
  ) { }

  ngOnInit() {
    this.order.cartItems.forEach(cartItem => {
      this.total += +cartItem.itemPrice;
    });
   }

  close() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalCtrl.dismiss({
      'dismissed': true
    });
  }
}
