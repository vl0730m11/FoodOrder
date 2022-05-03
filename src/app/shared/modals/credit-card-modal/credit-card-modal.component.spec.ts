import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CreditCardModal } from './credit-card-modal.component';

describe('CreditCardModal', () => {
  let component: CreditCardModal;
  let fixture: ComponentFixture<CreditCardModal>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreditCardModal ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CreditCardModal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
