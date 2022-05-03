import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { CreditCard } from 'src/app/models/classes';

@Component({
  selector: 'payment-method',
  templateUrl: './payment-method.component.html',
  styleUrls: ['./payment-method.component.scss'],
})
export class PaymentMethodComponent implements OnInit {

  @Input() selectedCard: CreditCard;

  @Output() onSelectPayment = new EventEmitter();

  get isValid() {
    return (this.selectedCard !== null);
  }

  constructor() { }

  ngOnInit() { }

  changePaymentMethod() {
    this.onSelectPayment.emit();
  }
}
