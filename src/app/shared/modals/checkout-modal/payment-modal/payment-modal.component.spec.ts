import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PaymentModal } from './payment-modal.component';

describe('PaymentModalComponent', () => {
  let component: PaymentModal;
  let fixture: ComponentFixture<PaymentModal>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaymentModal ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PaymentModal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
