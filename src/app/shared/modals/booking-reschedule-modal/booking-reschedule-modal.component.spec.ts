import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BookingRescheduleModal } from './booking-reschedule-modal.component';

describe('BookingRescheduleModal', () => {
  let component: BookingRescheduleModal;
  let fixture: ComponentFixture<BookingRescheduleModal>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookingRescheduleModal ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BookingRescheduleModal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
