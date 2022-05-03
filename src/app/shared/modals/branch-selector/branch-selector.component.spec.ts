import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BranchSelectorModal } from './branch-selector.component';

describe('BranchSelectorModal', () => {
  let component: BranchSelectorModal;
  let fixture: ComponentFixture<BranchSelectorModal>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BranchSelectorModal ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BranchSelectorModal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
