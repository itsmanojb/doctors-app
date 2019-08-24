import { Injectable } from '@angular/core';
import Deals from '../../assets/dummy/deals.json';

@Injectable({
  providedIn: 'root'
})
export class MarketplaceService {

  private dummyDeals: any[] = Deals;
  constructor() { }

  getDeals(category?: string) {
    // console.log(this.dummyDeals);
    return this.dummyDeals;
  }

  getTodayDeals(category?: string) {
    // console.log(this.dummyDeals);
    return this.dummyDeals;
  }

  getDealsByCorp(category?: string) {
    // console.log(this.dummyDeals);
    return this.dummyDeals;
  }

}
