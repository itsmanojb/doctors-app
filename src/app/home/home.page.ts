import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ModalController, NavController, ToastController } from '@ionic/angular';
import { Router, NavigationStart, Event } from '@angular/router';
import { Storage } from '@ionic/storage';
import { Subject } from 'rxjs';
// import { InfoModalComponent } from '../_components/info-modal/info-modal.component';
import { SearchComponent } from '../_components/search/search.component';
import { TopicsComponent } from '../_components/topics/topics.component';
import { VideoDetailsComponent } from '../videos/video-details/video-details.component';

import { InteractionService } from '../_services/interaction.service';
import { HomeDataService } from './home-data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  greetName: string;
  token: string;

  allTopics: any[] = [];
  userTopics: string[] = [];
  videos: any[] = [];
  patients: any[] = [];
  deals: any[] = [];

  dealLoaded = false;

  darkMode: boolean;
  showPrivacyBanner = true;
  showReminder: boolean;

  private refreshNeeded: Subject<void> = new Subject<void>();

  slideOpts = {
    // grabCursor: true,
    // slidesPerColumn: 1,
    // spaceBetween: 30,
    // freeMode: true,
    // loop: true,
    // speed: 600,
    // parallax: true,
    autoplay: {
      delay: 2500,
      disableOnInteraction: true,
    },
  };

  socialSlideOpts = {
    slidesPerView: 2.2,
    // slidesPerColumn: 1,
    // grabCursor: true,
    freeMode: true,
  };

  careSlideOpts = {
    slidesPerView: 3,
    // slidesPerColumn: 2,
    // grabCursor: true,
  };

  orderSlideOpts = {
    // grabCursor: true,
  };

  dealsSlideOpts = {};

  patientsSlideOpts = {
    freeMode: true,
    slidesPerView: 3,
  };

  eduVidslideOpts = {
    // slidesPerView: 1.2,
    // spaceBetween: 20,
  };


  constructor(
    private title: Title,
    private interact: InteractionService,
    private modal: ModalController,
    private toast: ToastController,
    private store: Storage,
    private nav: NavController,
    private router: Router,
    private homeData: HomeDataService,
  ) { }

  ngOnInit() {
    this.title.setTitle('Doctor Dashboard');
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationStart) {
        this.hideModal();
      }
    })
  }

  ionViewDidEnter() {
    this.store.get('DARK_UI').then((mode) => this.darkMode = mode ? true : false);
    this.store.get('BANN_PRIVACY').then((show) => this.showPrivacyBanner = show !== 'N' ? true : false);
    // this.refreshNeeded.next();
    this.loadData();
  }

  loadData() {
    this.videos = this.homeData.getRandomVideos(4);
    this.patients = this.homeData.getRandomPatients(6);
    this.deals = this.homeData.getRandomDeals(7);
    setTimeout(() => {
      this.dealLoaded = true;
    }, 2000);
  }

  async initSearch() {
    const modal = await this.modal.create({
      component: SearchComponent,
    });
    return await modal.present();
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

  hideBanner() {
    this.showPrivacyBanner = false;
    this.store.set('BANN_PRIVACY', 'N');
  }

  navigateTo(e: string) {
    switch (e) {
      case 'REF':
        this.nav.navigateForward('/referrals');
        break;
      case 'APPO':
        this.nav.navigateForward('/schedule');
        break;
      case 'EHR':
        this.nav.navigateForward('/e-health-records');
        break;
      case 'VID':
        this.nav.navigateForward('/videos');
        break;
      default:
        break;
    }
  }

  async openTopics() {
    const modal = await this.modal.create({
      component: TopicsComponent,
    });
    return await modal.present();
  }


  async playVideo(video) {
    const modal = await this.modal.create({
      component: VideoDetailsComponent,
      componentProps: {
        video
      },
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

  async hideModal() {
    const modal = await this.modal.getTop();
    if (modal) {
      modal.dismiss();
    }
  }

  doRefresh(e) {
  }

  goToProfile() {
    this.hideBanner();
    this.nav.navigateForward('/account/my-profile');
  }

  dismissReminder() {
    this.showReminder = false;
  }

}
