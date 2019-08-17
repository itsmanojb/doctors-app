import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {

  constructor(
    private modal: ModalController,
  ) { }

  ngOnInit() {
  }

  goBack() {
    this.modal.dismiss(null);
  }

}
