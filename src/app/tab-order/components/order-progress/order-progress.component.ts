import { Component, OnInit, Input } from '@angular/core';
import { Order, RestaurantBranch } from 'src/app/models/classes';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'order-progress',
  templateUrl: './order-progress.component.html',
  styleUrls: ['./order-progress.component.scss'],
})
export class OrderProgressModal implements OnInit {

  @Input() order: Order;
  @Input() branch: RestaurantBranch;

  constructor(
    private modalCtrl: ModalController
  ) { }

  ngOnInit() {

  }

  close() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalCtrl.dismiss({
      dismissed: true
    });
  }

  callRestaurant(branch: RestaurantBranch) {
    if (!branch) { return; }

  }

  openGps(branch: RestaurantBranch) {
    if (!branch) { return; }

  }
}
