import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit {

  constructor(
    private modal: ModalController,
  ) { }

  ngOnInit() { }

  saveSettings(): any {
    throw new Error('Method not implemented.');
  }

  resetSettings(): any {
    throw new Error('Method not implemented.');
  }

  closeSettings(): void {
    this.modal.dismiss();
  }

}
