import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LoginRootModal } from './login-root-modal.component';

describe('LoginRootModal', () => {
  let component: LoginRootModal;
  let fixture: ComponentFixture<LoginRootModal>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginRootModal ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginRootModal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
