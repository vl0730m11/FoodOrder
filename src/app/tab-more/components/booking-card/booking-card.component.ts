import { Component, OnInit, Input } from '@angular/core';
import { Booking } from 'src/app/models/booking';

@Component({
  selector: 'booking-card',
  templateUrl: './booking-card.component.html',
  styleUrls: ['./booking-card.component.scss'],
})
export class BookingCardComponent implements OnInit {

  @Input() booking: Booking = new Booking();
  @Input() active = false;

  constructor() { }

  ngOnInit() {
    console.log(this.booking);
  }
}
