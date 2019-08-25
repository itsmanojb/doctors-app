import { Component, OnInit } from '@angular/core';
import {
  NavController,
  ModalController,
  ToastController,
  ActionSheetController
} from '@ionic/angular';
import {
  ActivatedRoute,
  Router,
  Event,
  NavigationStart
} from '@angular/router';
import { Title, SafeUrl, DomSanitizer } from '@angular/platform-browser';
import { Observable } from 'rxjs';

import { MarketplaceService } from '../marketplace.service';
import { UtilityService } from 'src/app/_services/utility.service';

import { DealMapComponent } from '../deal-map/deal-map.component';
// import { ChatroomComponent } from 'src/app/chat/chatroom/chatroom.component';
// import { MediaGalleryComponent } from 'src/app/_components/media-gallery/media-gallery.component';

@Component({
  selector: 'app-deal-details',
  templateUrl: './deal-details.component.html',
  styleUrls: ['./deal-details.component.scss']
})
export class DealDetailsComponent implements OnInit {

  dealId: number;
  ownerId: number;
  address: string;
  deepLevel: boolean;

  dealExpiry: any;
  buyCount = 0;
  totalInterest = 0;
  sellProgress = '0';

  commentCount = 0;
  commentLoading: boolean;
  allComments: any[] = [];
  fullComments = false;

  dataLoading: boolean;
  deal: any;
  coverImgSrc: string;
  initiatingChat: boolean;

  constructor(
    private title: Title,
    private nav: NavController,
    private route: ActivatedRoute,
    private router: Router,
    private data: MarketplaceService,
    private modal: ModalController,
    private toast: ToastController,
    private sheet: ActionSheetController,
    private utility: UtilityService
  ) {
    this.route.queryParams.subscribe(params => {
      this.dealId = parseInt(params['id']);
      this.deepLevel = params['deep'] || false;
    });
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationStart) {
        this.hideModal();
      }
    });
  }

  ngOnInit() {
    this.title.setTitle('Getting deal details...');
    this.getDealDetails();
    // Observable.interval(1000).takeWhile(() => true).subscribe(() => this.getDealEnd());
  }

  getDealDetails() {
    this.dataLoading = true;
    const dealData = this.data.getDealDetails(this.dealId);
    this.deal = dealData;
    this.title.setTitle(`${this.deal.title} | Deals`);
    setTimeout(() => {
      this.dataLoading = false;
      this.loadCommentCount();
    }, 2000);

    this.address = this.deal.corp.address;
    this.buyCount = this.deal.stocks.total - this.deal.stocks.available;
    const progress = this.buyCount !== 0 ? (this.deal.stocks.available * 100) / this.deal.stocks.total : 0;
    this.sellProgress = `${progress}%`;
    this.coverImgSrc = this.deal.media[0].url;
    this.getDealEnd();

  }

  getDealEnd() {
    if (this.deal) {
      let { day, month, year } = this.utility.createCymd(this.deal.endsOn);
      // let day = 12, month = 5, year = 2019;
      const monthNames = [
        '',
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec'
      ];
      let output = '';
      const toDate = new Date();

      if (toDate.getFullYear() === year) {
        if (toDate.getMonth() + 1 === month) {
          if (toDate.getDate() === day) {
            output = `in ${23 - toDate.getHours()}:${59 -
              toDate.getMinutes()}:${59 - toDate.getSeconds()}`;
          } else if (toDate.getDate() + 1 === day) {
            output = `on Tomorrow`;
          } else {
            output = `in ${day - toDate.getDate()} days`;
          }
        } else if (toDate.getMonth() + 2 === month) {
          output = `in ${day - toDate.getDate()} days`;
        } else {
          output = `on ${monthNames[month]} ${day}`;
        }
      } else {
        output = `on ${monthNames[month]} ${day}, ${year}`;
      }
      // console.log(output);
      this.dealExpiry = output;
    }
  }

  loadCommentCount() {
    this.commentLoading = true;
    this.allComments = this.deal.reviews;
    this.commentCount = this.deal.reviews.length;
    setTimeout(() => {
      this.commentLoading = false;
    }, 1500);
  }

  async showLocation() {
    const obj = {
      lat: this.deal.corp.location.lat,
      lon: this.deal.corp.location.long,
      name: this.deal.corp.name,
      address: this.address
    };
    const modal = await this.modal.create({
      component: DealMapComponent,
      componentProps: { value: obj }
    });
    return await modal.present();
  }

  // async showGallery(media: any, current?: number) {
  //   const modal = await this.modal.create({
  //     component: MediaGalleryComponent,
  //     componentProps: {
  //       media,
  //       current,
  //       token: this.jwt
  //     }
  //   });
  //   return await modal.present();
  // }

  async showComments(el: HTMLElement) {
    el.scrollIntoView({ behavior: 'smooth' });
  }

  async hideModal() {
    const modal = await this.modal.getTop();
    if (modal) {
      modal.dismiss();
    }
  }

  async presentToast(msg) {
    const toast = await this.toast.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }

  async showShareSheet() {
    const actionSheet = await this.sheet.create({
      cssClass: 'sheet-x',
      header: 'Share this deal',
      buttons: [
        {
          text: 'Facebook',
          icon: 'logo-facebook',
          handler: () => {
            this.shareDeal('fb');
          }
        },
        {
          text: 'Twitter',
          icon: 'logo-twitter',
          handler: () => {
            this.shareDeal('tw');
          }
        },
        {
          text: 'LinkedIn',
          icon: 'logo-linkedin',
          handler: () => {
            this.shareDeal('li');
          }
        },
        {
          text: 'Skype',
          icon: 'logo-skype',
          handler: () => {
            this.shareDeal('sk');
          }
        },
        {
          text: 'WhatsApp',
          icon: 'logo-whatsapp',
          handler: () => {
            this.shareDeal('wa');
          }
        },
        {
          text: 'Copy to clipboard',
          icon: 'copy',
          handler: () => {
            this.shareDeal('copy');
          }
        },
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => { }
        }
      ]
    });
    await actionSheet.present();
  }

  async shareDeal(vendor) {
    const location = window.location.origin;
    const text = 'I got a great deal';
    const link = `${location}/marketplace/deal?id=${this.dealId}`;

    switch (vendor) {
      case 'fb':
        window.open(`https://www.facebook.com/sharer.php?u=${link}`);
        break;
      case 'wa':
        window.open(`https://api.whatsapp.com/send?text=${link}&url=${text}`);
        break;
      case 'tw':
        window.open(`https://twitter.com/share?text=${text}&url=${link}`);
        break;
      case 'li':
        window.open(
          `http://www.linkedin.com/shareArticle?mini=true&amp;url=${link}`
        );
        break;
      case 'sk':
        window.open(`https://web.skype.com/share?url=${link}&text=${text}`);
        break;
      case 'copy':
        this.utility.copyToClipboard(link, text);
        break;
    }
  }

  exploreDeals() {
    this.nav.navigateForward(['marketplace/explore-deals'], {
      queryParams: { corpId: this.deal.corp.id }
    });
  }

  goBack() {
    this.nav.back();
  }
}
