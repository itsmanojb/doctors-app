import { Component, OnInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { MatBottomSheet } from '@angular/material';
import { ModalController, ToastController } from '@ionic/angular';
import * as _ from 'lodash';

import { AppointmentComponent } from './appointment/appointment.component';
import { SearchComponent } from '../_components/search/search.component';
import Appointments from '../../assets/dummy/appointments.json';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.page.html',
  styleUrls: [
    './schedule.page.scss',
    './calendar.scss',
  ],
})
export class SchedulePage implements OnInit {

  @ViewChild('scheduleCalendar', { read: ElementRef }) calendar: ElementRef;

  user: any;
  jwt: string;

  month: any;
  next: any;
  previous: any;
  monthLabel: any;
  disablePastDays: boolean;
  activeDates = null;
  date = new Date();
  todaysDate = new Date();
  selectedDate: string;
  slots: any[] = [];

  appoLoading: boolean;
  appoLoadError: boolean;
  noAppos: boolean;
  appointments = [];

  constructor(
    private renderer: Renderer2,
    private bottomSheet: MatBottomSheet,
    private toast: ToastController,
    private title: Title,
    private modal: ModalController,
  ) {
    this.disablePastDays = false;
  }

  ngAfterViewInit(): void {
    this.month = this.calendar.nativeElement.querySelectorAll('.calendar__body')[0];
    this.next = this.calendar.nativeElement.querySelectorAll('.calendar__btn.next')[0];
    this.previous = this.calendar.nativeElement.querySelectorAll('.calendar__btn.prev')[0];
    this.monthLabel = this.calendar.nativeElement.querySelectorAll('.calendar__header__label')[0];
    this.date.setDate(1);
    this.createMonth();
    this.createListeners();
  }

  ngOnInit() {
    this.title.setTitle('Appointments Schedule');
    // this.slots = this.generateSlots(60, 6, 22);
    this.loadAppointments();
  }

  createDay(num, day, year) {
    const newDay = this.renderer.createElement('div');
    const dateEl = this.renderer.createElement('span');
    dateEl.innerHTML = num;
    newDay.className = 'calendar__date';
    newDay.setAttribute('data-calendar-date', this.date.toLocaleDateString('en-US'));

    if (num === 1) {
      if (day === 0) {
        newDay.style.marginLeft = `${(6 * 14.28)}%`;
      } else {
        newDay.style.marginLeft = `${((day - 1) * 14.28)}%`;
      }
    }

    if (this.disablePastDays) {
      if (this.date.getTime() <= this.todaysDate.getTime() - 1) {
        newDay.classList.add('calendar__date--disabled');
      } else {
        newDay.classList.add('calendar__date--active');
      }
    } else {
      newDay.classList.add('calendar__date--active');
      if (this.date.getTime() <= this.todaysDate.getTime() - 1) {
        newDay.classList.add('calendar__date--past');
      }
    }

    if (this.date.toString() === this.todaysDate.toString()) {
      newDay.classList.add('calendar__date--today');
    }

    this.renderer.appendChild(newDay, dateEl);
    this.renderer.appendChild(this.month, newDay);

  }

  createMonth(): any {
    const currentMonth = this.date.getMonth();
    while (this.date.getMonth() === currentMonth) {
      this.createDay(
        this.date.getDate(),
        this.date.getDay(),
        this.date.getFullYear(),
      );
      this.date.setDate(this.date.getDate() + 1);
    }
    this.date.setDate(1);
    this.date.setMonth(this.date.getMonth() - 1);

    const monthandYear = `${this.monthsAsString(this.date.getMonth())}  ${this.date.getFullYear()}`;
    this.monthLabel.innerHTML = monthandYear;
    this.dateClicked();
  }

  monthsAsString(monthIndex: number): string {
    return ['January', 'Febuary', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'][monthIndex];
  }

  createListeners(): void {
    this.next.addEventListener('click', () => {
      this.clearCalendar();
      const nextMonth = this.date.getMonth() + 1;
      this.date.setMonth(nextMonth);
      this.createMonth();
    });
    this.previous.addEventListener('click', () => {
      this.clearCalendar();
      const prevMonth = this.date.getMonth() - 1;
      this.date.setMonth(prevMonth);
      this.createMonth();
    });
  }

  dateClicked(): any {
    this.activeDates = document.querySelectorAll('.calendar__date--active');
    this.activeDates.forEach((dateEl) => {
      dateEl.addEventListener('click', () => {
        this.removeActiveClass();
        dateEl.classList.add('calendar__date--selected');
        this.selectedDate = dateEl.getAttribute('data-calendar-date');
        this.loadAppointments(this.selectedDate);
      });
    });
  }

  clearCalendar() {
    this.month.innerHTML = '';
  }

  removeActiveClass() {
    this.activeDates.forEach((activeDate) => {
      activeDate.classList.remove('calendar__date--selected');
    });
  }

  // generateSlots(step: number, from?: number, to?: number) {
  //   const slots = [];
  //   const dt = new Date(1970, 0, 1, 0, 0, 0, 0);
  //   while (dt.getDate() === 1) {
  //     const point = dt.toLocaleTimeString('en-US').replace(/:\d{2}\s/, ' ');
  //     const timeValue = point.split(' ')[0];
  //     const obj = {
  //       hour: timeValue.split(':')[0],
  //       minute: timeValue.split(':')[1],
  //       ampm: point.split(' ')[1],
  //     };
  //     dt.setMinutes(dt.getMinutes() + step);
  //     slots.push(obj);
  //   }
  //   const start = from;
  //   const end = to;
  //   const startOffset = start >= 6 ? (start * 60) / step : ((12 - start) * 60) / step;
  //   const endOffset = ((12 - end) * 60) / step;
  //   slots.splice(0, startOffset);
  //   if (end < 12) {
  //     slots.splice(-endOffset);
  //   }
  //   return slots;
  // }

  showAppoInfo(appo: any): void {
    const bottomSheetRef = this.bottomSheet.open(AppointmentComponent, {
      panelClass: 'sheet-x',
      closeOnNavigation: true,
      data: {
        appo,
        date: this.selectedDate,
      },
    });
  }

  async initSearch() {
    const modal = await this.modal.create({
      component: SearchComponent,
    });
    return await modal.present();
  }

  async loadAppointments(aptDate?) {
    if(aptDate) {
      this.appoLoading = true;
      const date = +aptDate.split('/')[1];
      setTimeout(() => {
        if(date % 2 == 0) {
          this.noAppos = false;
          this.appointments = this.sortAppointments();
        } else {
          this.noAppos = true;
        }
        this.appoLoading = false;
        this.appoLoadError = false;
      }, 500);
    }
    this.noAppos = true;
  }

  sortAppointments(): any[] {
    const sortedArr = _.sortBy(Appointments, 'time');
    return sortedArr;
  }

  async presentToast(msg: string) {
    const toast = await this.toast.create({
      message: msg,
      position: 'bottom',
      duration: 2000,
      mode: 'md',
    });
    toast.present();
  }

}
