import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EditorModal } from './editor-modal.component';

describe('EditorModal', () => {
  let component: EditorModal;
  let fixture: ComponentFixture<EditorModal>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditorModal ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EditorModal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
