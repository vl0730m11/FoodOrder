import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { OrderProgressModal } from './order-progress.component';

describe('OrderProgressModal', () => {
  let component: OrderProgressModal;
  let fixture: ComponentFixture<OrderProgressModal>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderProgressModal ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(OrderProgressModal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
