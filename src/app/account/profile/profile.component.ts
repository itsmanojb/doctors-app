import { Component, OnInit } from '@angular/core';
import { NavController, ModalController, ToastController } from '@ionic/angular';
import { Title } from '@angular/platform-browser';
import { TopicsComponent } from '../../_components/topics/topics.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {

  dataLoading = true;
  medSchoolCollapsed = true;
  fellowshipCollapsed = true;
  residencyCollapsed = true;

  allTopics: any[] = [];
  awards: string[] = [];
  missingFields: string[] = [];
  completionPercentage = 0;

  constructor(
    private title: Title,
    private nav: NavController,
    private modal: ModalController,
    private toast: ToastController,
  ) {
  }

  ngOnInit() {
    this.title.setTitle('My Profile');
    setTimeout(() => {
      this.dataLoading = false;
    }, 2000);
  }

  async openTopics() {
    const modal = await this.modal.create({
      component: TopicsComponent
    });
    return await modal.present();
  }

  async presentToast(msg) {
    const toast = await this.toast.create({
      message: msg,
      position: 'bottom',
      duration: 2000,
    });
    toast.present();
  }

  goToEditProfile() {
    return false;
  }

  goBack() {
    this.nav.back();
  }
}
