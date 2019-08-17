import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { NavController, AlertController, ModalController, ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { SETTINGS } from '../app.global';
import { InteractionService } from '../_services/interaction.service';
// import { TopicsComponent } from '../_components/topics/topics.component';

@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage implements OnInit {

  languages: string;
  appName = SETTINGS.app.name;
  version = SETTINGS.app.version;
  darkMode: boolean;

  constructor(
    private title: Title,
    private alert: AlertController,
    private toast: ToastController,
    private nav: NavController,
    private modal: ModalController,
    private store: Storage,
    private interact: InteractionService,
  ) { }

  ngOnInit() {
    this.title.setTitle('My Account');
    this.store.get('DARK_UI').then((mode) => this.darkMode = mode ? true : false)
  }

  goBack() {
    this.nav.back();
  }

  goto(path: string) {
    this.nav.navigateForward(path);
  }

  slideOpts = {
    grabCursor: true,
    slidesPerView: 2,
    spaceBetween: 0,
    freeMode: true,
  };

  // async openTopicsList() {
  //   const modal = await this.modal.create({
  //     component: TopicsComponent,
  //     componentProps: {
  //       value: {
  //         uid: this.user.userId,
  //         token: this.user.jwt_token,
  //       },
  //     },
  //   });
  //   modal.onDidDismiss()
  //     .then((res: any) => {
  //       if (res.data) {
  //         this.presentToast(res.data);
  //       }
  //     });
  //   return await modal.present();
  // }

  async presentToast(msg: string) {
    const toast = await this.toast.create({
      message: msg,
      position: 'bottom',
      duration: 2000,
      mode: 'md',
    });
    toast.present();
  }

  changeUIMode(e) {
    if (e.detail.checked) {
      this.store.set('DARK_UI', true)
        .then(_ => {
          this.interact.setDarkMode(true);
        });
    } else {
      this.store.set('DARK_UI', false)
        .then(_ => {
          this.interact.setDarkMode(false);
        });
    }
  }

  async logout() {
    const alert = await this.alert.create({
      header: 'Confirm!',
      message: 'You really want to log out?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        }, {
          text: 'Yes',
          handler: () => {
            this.doLogout();
          },
        },
      ],
    });

    await alert.present();
  }

  doLogout() {
    this.nav.navigateRoot(['/login']);
  }

}
