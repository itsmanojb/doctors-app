import { Component, OnInit, Inject } from '@angular/core';
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material';

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.scss'],
})
export class AppointmentComponent implements OnInit {

  appo: any;

  clinicAppo: boolean;
  telemedAppo: boolean;
  dealAppo: boolean;

  appoLocation: string;
  appoSubject: string;
  appoDesc: string;
  appoDate: string;

  timeHasPassed = false;
  inactiveAppt = true;

  constructor(
    private bottomSheetRef: MatBottomSheetRef<AppointmentComponent>,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: any,
  ) {
    this.appo = data.appo;
    this.appoDate = data.date;
    console.log(data);
  }

  ngOnInit() {
    this.clinicAppo = this.appo.consultType === 'visit' ? true : false;
    this.telemedAppo = this.appo.consultType !== 'visit' ? true : false;
    this.appoSubject = this.appo.subject;
    this.appoDesc = this.appo.desc;
  }

  fullName(): string {
    return this.appo.userName;
  }

  age(): string {
    const dob = this.appo.dob;
    if (dob) {
      const currentYear = new Date().getFullYear();
      const userDOBYear = new Date(dob).getFullYear();
      const calculatedYear = currentYear - userDOBYear;
      return calculatedYear > 0 ? `${calculatedYear} yr` : '';
    }
    return;
  }

  getAddress(full = false): string {
    const addObj = this.appo.address;
    if(!addObj) {
      return '';
    }
    const address: string[] = [];
    if (addObj.city) {
      address.push(addObj.city);
    }
    if (addObj.state) {
      address.push(addObj.locstate);
    }
    if (addObj.zip) {
      address.push(addObj.zip);
    }
    if (full) {
      return address.join(', ');
    }
    return `${addObj.city}, ${addObj.state}`;
  }

  getClinicAddress(): string {
    const address = this.appo.location;
    const addr = [address.address, address.city, address.state];
    if (addr.length < 3) {
      return 'N/A';
    }
    return `${address.address}, ${address.city}, ${address.locstate}`;
  }

  getAppoTime() {
    const date = new Date(this.appoDate);
    const month = date.toLocaleString('en-us', {
      month: 'short',
    });
    return `${month} ${date.getDate()}, ${this.appo.time}`;
  }


  shouldEnableButton(): boolean {
    return;
  }

  cancel(event: MouseEvent): void {
    this.bottomSheetRef.dismiss();
    event.preventDefault();
  }

  isAppointmentTimeOver(): boolean {
    return;
  }

  getAppoEndTime(): number {
    return;
  }

  ctaVisible(): boolean {
    return !this.isFullfilled;
  }

  isFullfilled() {
    const appoDate = parseInt(this.appoDate.split('/')[1]);
    return  appoDate < new Date().getDate() ? true : false;
  }

}
