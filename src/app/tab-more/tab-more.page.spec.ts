import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TabMorePage } from './tab-more.page';

describe('TabMorePage', () => {
  let component: TabMorePage;
  let fixture: ComponentFixture<TabMorePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TabMorePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TabMorePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
