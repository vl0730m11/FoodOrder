import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SignupModal } from './signup-modal.component';

describe('SignupModal', () => {
  let component: SignupModal;
  let fixture: ComponentFixture<SignupModal>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SignupModal ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SignupModal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
