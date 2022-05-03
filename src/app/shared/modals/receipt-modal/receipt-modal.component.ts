import { Component, OnInit, Input } from '@angular/core';
import { Order } from 'src/app/models/classes';
import { ModalController } from '@ionic/angular';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-receipt-modal',
  templateUrl: './receipt-modal.component.html',
  styleUrls: ['./receipt-modal.component.scss'],
})
export class ReceiptModal implements OnInit {

  @Input() order: Order;

  constructor(
    private modalCtrl: ModalController,
    private orderService: OrderService
  ) { }

  ngOnInit() {
  }

  download() {
    this.orderService.downloadReceipt(this.order).subscribe(payment => {
      window.open(payment['receipt_url'], '_blank');
    });
  }

  close() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalCtrl.dismiss({
      dismissed: true
    });
  }
}
