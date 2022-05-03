import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CheckoutModal } from './checkout-modal.component';

describe('CheckoutModal', () => {
  let component: CheckoutModal;
  let fixture: ComponentFixture<CheckoutModal>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CheckoutModal ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CheckoutModal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
