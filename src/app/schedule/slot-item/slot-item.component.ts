import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-slot-item',
  templateUrl: './slot-item.component.html',
  styleUrls: ['./slot-item.component.scss'],
})
export class SlotItemComponent implements OnInit {

  @Input() appo: any;
  @Output() appoSelected = new EventEmitter();

  clinicAppo: boolean;
  telemedAppo: boolean;

  appoTime: string;
  patientName: string;
  clinic: string;

  constructor() {
  }

  ngOnInit() {
    this.clinicAppo = this.appo.consultType === 'visit' ? true : false;
    this.telemedAppo = this.appo.consultType !== 'visit'? true : false;
    this.patientName = this.appo.userName;
    this.clinic = this.appo.location;
    this.appoTime = this.appo.time;
  }

  itemClicked() {
    this.appoSelected.emit();
  }

}
