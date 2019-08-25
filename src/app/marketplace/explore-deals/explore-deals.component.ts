import { Component, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { NavController, ModalController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';

import { SearchComponent } from 'src/app/_components/search/search.component';
import { MarketplaceService } from '../marketplace.service';

@Component({
  selector: 'app-explore-deals',
  templateUrl: './explore-deals.component.html',
  styleUrls: ['../marketplace.page.scss', './explore-deals.component.scss']
})
export class ExploreDealsComponent implements OnInit {


  corpId: number;
  corpName: string;
  emptyFeed: boolean;
  feedLoading: boolean;

  deals: any[] = [];

  constructor(
    private title: Title,
    private modal: ModalController,
    private data: MarketplaceService,
    private nav: NavController,
    private route: ActivatedRoute
  ) {
    this.route.queryParams.subscribe(params => {
      this.corpId = parseInt(params['corpId']);
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
    this.feedLoading = true;
    const dealData = this.data.getDealsByCorp(this.corpId);
    setTimeout(() => {
      this.emptyFeed = dealData.length === 0 ? true : false;
      this.corpName = dealData[0].corp.name;
      this.title.setTitle(`All Deals | ${this.corpName}`);
      this.deals = dealData;
      this.feedLoading = false;
    }, 2000);
  }

  showDetails(deal: any) {
    const id = deal.dealId;
    this.nav.navigateForward(['/marketplace/deal'], {
      queryParams: { id, deep: true }
    });
  }

  goBack() {
    this.nav.back();
  }
}
