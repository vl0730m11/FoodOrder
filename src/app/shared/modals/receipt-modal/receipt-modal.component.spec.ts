import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ReceiptModal } from './receipt-modal.component';

describe('ReceiptModal', () => {
  let component: ReceiptModal;
  let fixture: ComponentFixture<ReceiptModal>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReceiptModal ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ReceiptModal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
