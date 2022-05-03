import { Component, Input } from '@angular/core';
import { BookingChangeComponent } from './booking-change/booking-change.component';
import { BookingInfoComponent } from './booking-info/booking-info.component';

@Component({
  selector: 'app-booking-modal',
  templateUrl: './booking-modal.component.html',
  styleUrls: ['./booking-modal.component.scss'],
})
export class BookingModalComponent {
  root: any;
  @Input() set isReschedule(value: boolean) {
    this.root = value ? BookingChangeComponent : BookingInfoComponent;
  }
}
