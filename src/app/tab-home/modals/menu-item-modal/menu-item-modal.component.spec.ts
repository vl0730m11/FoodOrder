import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MenuItemModal } from './menu-item-modal.component';

describe('MenuItemModal', () => {
  let component: MenuItemModal;
  let fixture: ComponentFixture<MenuItemModal>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuItemModal ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MenuItemModal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
