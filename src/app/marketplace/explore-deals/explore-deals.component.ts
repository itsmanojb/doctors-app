import { Component, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import {
  NavController,
  ModalController,
  IonInfiniteScroll
} from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';

import { SearchComponent } from 'src/app/_components/search/search.component';
import { MarketplaceService } from '../marketplace.service';
import { SETTINGS } from '../../app.global';

@Component({
  selector: 'app-explore-deals',
  templateUrl: './explore-deals.component.html',
  styleUrls: ['../marketplace.page.scss', './explore-deals.component.scss']
})
export class ExploreDealsComponent implements OnInit {
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

  private readonly initialPostsCount: number;
  private readonly paginationCount: number;

  corpId: string;
  corpName: string;
  emptyFeed: boolean;
  feedLoading: boolean;
  hasMoreData: boolean;

  deals: any[] = [];
  startIndex: number;
  fetchUpto: number;

  constructor(
    private title: Title,
    private modal: ModalController,
    private data: MarketplaceService,
    private nav: NavController,
    private route: ActivatedRoute
  ) {
    this.initialPostsCount = SETTINGS.feed.initialPostsCount;
    this.paginationCount = SETTINGS.feed.initialPostsCount;
    this.route.queryParams.subscribe(params => {
      this.corpId = atob(params['corp']) || null;
    });
  }

  ngOnInit() {
    this.getDeals();
  }

  doRefresh(event) {
    this.getDeals();
    setTimeout(() => {
      event.target.complete();
    }, 500);
  }

  async initSearch() {
    const modal = await this.modal.create({
      component: SearchComponent
    });
    return await modal.present();
  }

  getDeals(): void {
    this.title.setTitle('Getting Other Deals...');
    this.startIndex = 0;
    this.fetchUpto = this.initialPostsCount;
    this.feedLoading = true;
    // this.data
    //   .getDealsByCorp(this.corpId, this.startIndex, this.fetchUpto)
    //   .subscribe(
    //     res => {
    //       const feedData = res.json();
    //       this.corpName = feedData[0].secondName;
    //       this.title.setTitle(`Deals at ${feedData[0].secondName}`);
    //       const activeDeals = this.ditchOldDeals(feedData);
    //       this.emptyFeed = activeDeals.length === 0 ? true : false;
    //       this.hasMoreData =
    //         activeDeals.length > this.initialPostsCount ? true : false;
    //       this.deals = activeDeals;
    //       this.feedLoading = false;
    //     },
    //     err => {
    //       this.title.setTitle('No Deals Found | Marketplace');
    //       console.log(err);
    //     }
    //   );
  }

  // loadMore(event): void {
  //   this.startIndex = this.fetchUpto + 1;
  //   this.fetchUpto = this.startIndex + this.paginationCount;

  //   this.data.getDeals(this.startIndex, this.fetchUpto).subscribe(
  //     res => {
  //       if (res) {
  //         this.deals = this.deals.concat(res.json());
  //         event.target.complete();
  //       } else {
  //         event.target.disabled = true;
  //       }
  //     },
  //     err => {
  //       event.target.disabled = true;
  //     }
  //   );
  // }

  showDetails(deal: any) {
    const id = deal.dealId;
    const owner = window.btoa(deal.userId);
    this.nav.navigateForward(['/marketplace/deal'], {
      queryParams: { id, owner, deep: true }
    });
  }

  goBack() {
    this.nav.back();
  }
}
