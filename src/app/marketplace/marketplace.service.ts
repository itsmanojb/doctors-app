import { Injectable } from '@angular/core';
import Deals from '../../assets/dummy/deals.json';

@Injectable({
  providedIn: 'root'
})
export class MarketplaceService {

  private dummyDeals: any[] = Deals;
  constructor() { }

  getDeals(category?: string) {
    return this.dummyDeals;
  }

  getTodayDeals(category?: string) {
    return this.dummyDeals;
  }

  getDealsByCorp(corpId: number, category?: string) {
    const matchDeals = this.dummyDeals.filter(deal => deal.corp.id === corpId);
    return matchDeals;
  }

  getDealDetails(dealId: number) {
    const matchDeal = this.dummyDeals.filter(deal => deal.id === dealId);
    return matchDeal[0];
  }

}
