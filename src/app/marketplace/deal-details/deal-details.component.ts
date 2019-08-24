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
  private user: any;
  jwt: string;
  dealId: string;
  ownerId: string;
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
  coverImgSrc: SafeUrl = this.sanitizer.bypassSecurityTrustUrl(
    'assets/images/placeholder.png'
  );
  initiatingChat: boolean;

  constructor(
    private title: Title,
    private nav: NavController,
    private route: ActivatedRoute,
    private router: Router,
    private data: MarketplaceService,
    private sanitizer: DomSanitizer,
    private modal: ModalController,
    private toast: ToastController,
    private sheet: ActionSheetController,
    private utility: UtilityService
  ) {
    this.route.queryParams.subscribe(params => {
      this.dealId = params['id'];
      this.ownerId = atob(params['owner']);
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
    this.getUdata();
    // Observable.interval(1000).takeWhile(() => true).subscribe(() => this.getDealEnd());
  }

  async getUdata() {
    this.dataLoading = true;
    this.getDealDetails();
  }

  async getDealDetails() {
    // this.data
    //   .getDealDetails(this.ownerId, this.jwt, this.dealId)
    //   .toPromise()
    //   .then(res => {
    //     const data = res.json();
    //     console.log(data);
    //     this.deal = data;
    //     this.title.setTitle(`${this.deal.dealtexts.title} | Deals`);
    //     this.address = `${this.deal.corpextra.branch.demog.address}, ${
    //       this.deal.corpextra.branch.demog.city
    //     }, ${this.deal.corpextra.branch.demog.locstate}, ${
    //       this.deal.corpextra.branch.demog.zip
    //     }, ${this.deal.corpextra.branch.demog.country}`;
    //     // this.fetch.downloadMedia(data.media[0].tnrefId, this.jwt).subscribe(async (res) => {
    //     //   this.coverImgSrc = await this.fetch.getMediaSrc(res);
    //     // });
    //     this.dataLoading = false;
    //     this.buyCount = data.extra3.buyers.length;
    //     this.totalInterest = data.extra3.interested.length;
    //     const progress =
    //       this.totalInterest !== 0
    //         ? (this.buyCount * 100) / this.totalInterest
    //         : 0;
    //     this.sellProgress = `${progress}%`;
    //     this.loadCommentCount();
    //     this.getDealEnd();
    //   })
    //   .catch(err => {
    //     this.presentToast('Failed to load Deal Details');
    //     this.title.setTitle('Failed');
    //     // console.log(err);
    //   });
  }

  getDealEnd() {
    if (this.deal) {
      let { day, month, year } = this.deal.dtEnd;
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

  async loadCommentCount() {
    this.commentLoading = true;
    setTimeout(() => {
      this.allComments = [];
      this.commentCount = 0;
      this.commentLoading = false;
    }, 1500);
  }

  async showLocation() {
    const obj = {
      lat: this.deal.dealadd.loc.lat,
      lon: this.deal.dealadd.loc.lon,
      name: this.deal.corpextra.branch.branchName,
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

  // async initDealChat() {
  //   const param = {
  //     handle: this.user.handle,
  //     categId: 6,
  //     lHandles: [this.user.handle, this.deal.corpextra.corpHandle],
  //     desckeys: ['bizhandle', 'secondName', 'title', 'othhandle'],
  //     descvals: [this.deal.corpextra.corpHandle, this.deal.corpextra.branch.branchName, this.deal.dealtexts.title, this.user.handle],
  //     idkeys: ['bizUserId', 'secondId', 'dealId', 'othUserId'],
  //     idvals: [this.deal.corpextra.corpId, this.deal.corpextra.branch.branchId, this.deal.dealId, this.user.userId],
  //     chkgroup: false
  //   }
  //   this.initiatingChat = true;
  //   try {
  //     const res = await this.fetch.postAPICallSecure(patmdEndpoint.InitChat, param, this.jwt, true);
  //     const data = res[0];
  //     this.showChatScreen(data);
  //   } catch (error) {
  //     this.presentToast('Failed to initiate request.');
  //   } finally {
  //     this.initiatingChat = false;
  //   }
  // }

  // async showChatScreen(obj: any) {
  //   const modal = await this.modal.create({
  //     component: ChatroomComponent,
  //     backdropDismiss: false,
  //     cssClass: 'chatroom',
  //     componentProps: {
  //       chatType: 'deal',
  //       chatObj: {
  //         value: obj,
  //         handle: this.deal.corpextra.corpHandle,
  //         title: this.deal.dealtexts.title,
  //         bizUserId: this.deal.corpextra.corpId,
  //         dealId: this.deal.dealId,
  //         secondId: this.deal.corpextra.branch.branchId
  //       }
  //     }
  //   });
  //   return await modal.present();
  // }

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
    const ownerId = btoa(this.ownerId);
    const text = 'I got a great deal';
    const link = `${location}/marketplace/deal?id=${this.dealId}&${ownerId}`;

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
      queryParams: { corp: btoa(this.ownerId) }
    });
  }

  goBack() {
    this.nav.back();
  }
}
