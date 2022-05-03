import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-editor-modal',
  templateUrl: './editor-modal.component.html',
  styleUrls: ['./editor-modal.component.scss'],
})
export class EditorModal implements OnInit {
  @Input() value: string = '';
  @Input() label: string = '';

  constructor(
    private modalCtrl: ModalController
  ) { }

  ngOnInit() { }


  update() {
    this.modalCtrl.dismiss(this.value);
  }

  close() {
    this.modalCtrl.dismiss({
      dismissed: true
    });
  }
}
