import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModalController, NavController, ToastController } from '@ionic/angular';
import { Title } from '@angular/platform-browser';
import * as _ from 'lodash';

import { SettingsComponent } from './settings/settings.component';
import Notifications from '../../assets/dummy/notifications.json';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.page.html',
  styleUrls: ['./notifications.page.scss'],
})
export class NotificationsPage implements OnInit {

  otherNotifications: any[] = [];

  deletedON: any[] = [];

  user: any;
  transId: number;
  issue: string;

  dataLoading: boolean;
  noNotif: boolean;

  constructor(
    private title: Title,
    private modal: ModalController,
    private nav: NavController,
    private route: ActivatedRoute,
    private toast: ToastController,
  ) {
    this.route.params.subscribe((params) => {
      this.transId = params.id || null;
      this.issue = params.issue || null;
    });
  }

  ngOnInit() {
    this.title.setTitle('Notifications');
    this.getNotifications();
  }

  async getNotifications() {
    this.dataLoading = true;
    setTimeout(() => {
      this.otherNotifications = Notifications;
      this.dataLoading = false;
    }, 2000);

  }

  delete(index) {
    this.deletedON.push(index);
    this.otherNotifications = this.otherNotifications.filter(i => i.id !== index);
  }

  async openSettings() {
    const modal = await this.modal.create({
      component: SettingsComponent,
    });
    return await modal.present();
  }

  async presentToast(msg) {
    const toast = await this.toast.create({
      message: msg,
      position: 'bottom',
      duration: 2000,
      mode: 'md',
    });
    toast.present();
  }

  goBack() {
    this.nav.back();
  }

}
