import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SigninModal } from './signin-modal.component';

describe('SigninModal', () => {
  let component: SigninModal;
  let fixture: ComponentFixture<SigninModal>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SigninModal ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SigninModal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
