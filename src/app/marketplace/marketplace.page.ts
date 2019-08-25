import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { NavController, ModalController } from '@ionic/angular';

import { SearchComponent } from '../_components/search/search.component';
import { MarketplaceService } from './marketplace.service';

@Component({
  selector: 'app-marketplace',
  templateUrl: './marketplace.page.html',
  styleUrls: ['./marketplace.page.scss']
})
export class MarketplacePage implements OnInit {

  emptyFeed: boolean;
  feedLoading: boolean;

  dealsToday: any[] = [];
  deals: any[] = [];

  constructor(
    private title: Title,
    private modal: ModalController,
    private data: MarketplaceService,
    private nav: NavController
  ) { }

  ngOnInit() {
    this.title.setTitle('Marketplace');
    // this.getTodayDeals();
    this.getDeals();
  }

  doRefresh(event) {
    // this.getTodayDeals();
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

  getTodayDeals(): void {
    const dealData = this.data.getTodayDeals();
    setTimeout(() => {
      this.dealsToday = dealData;
    }, 5000);
  }

  getDeals(): void {
    this.feedLoading = true;
    const dealData = this.data.getDeals();
    setTimeout(() => {
      this.emptyFeed = dealData.length === 0 ? true : false;
      this.deals = dealData;
      this.feedLoading = false;
    }, 3000);
  }

  showDetails(deal: any) {
    const id = deal.id;
    this.nav.navigateForward(['/marketplace/deal'], {
      queryParams: { id }
    });
  }
}
