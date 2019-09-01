import { Injectable } from '@angular/core';
import Users from '../../assets/dummy/users.json';
import Deals from '../../assets/dummy/deals.json';
import Videos from '../../assets/dummy/videos.json';

@Injectable({
  providedIn: 'root'
})
export class HomeDataService {

  private readonly videos: any[] = Videos;
  private readonly users: any[] = Users;
  private readonly deals: any[] = Deals;

  constructor() { }

  getRandomVideos(n = 3) {
    let random = this.videos.sort(() => .5 - Math.random()).slice(0, n);
    return random;
  }

  getRandomPatients(n = 3) {
    const patients = this.users.filter(u => u.userType === 'Patient');
    let random = patients.sort(() => .5 - Math.random()).slice(0, n);
    return random;
  }

  getRandomDeals(n = 4) {
    let random = this.deals.sort(() => .5 - Math.random()).slice(0, n);
    return random;
  }

}
