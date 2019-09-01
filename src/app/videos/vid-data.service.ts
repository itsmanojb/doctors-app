import { Injectable } from '@angular/core';
import { DataService } from '../_services/data.service';
import Videos from '../../assets/dummy/videos.json';

@Injectable({
  providedIn: 'root',
})
export class VidDataService {

  private readonly videos: any[] = Videos;
  sortedVideos: any[] = [];

  constructor(private data: DataService) {
    this.sortedVideos = this.videos.sort(this.compare);
  }

  getVideos(pageNumber: number, perPage = 5) {
    const paginatedData = this.data.paginate(this.sortedVideos, pageNumber, perPage);
    return paginatedData.data;
  }

  compare(a, b) {
    // if (a.dtCreated < b.dtCreated) {
    //   return -1;
    // }
    if (a.dtCreated > b.dtCreated) {
      return 1;
    }
    return 0;
  }

  convertVideoTime(d: number): string {
    d = Number(d);
    var h = Math.floor(d / 3600);
    var m = Math.floor(d % 3600 / 60);
    var s = Math.floor(d % 3600 % 60);

    var mDisplay = m > 9 ? m : `0${m}`;
    var sDisplay = s > 9 ? s : `0${s}`;

    let time = '';

    if (h > 0) {
      if (m > 0) {
        time = `${h}:${mDisplay}:${sDisplay}`;
      } else {
        time = `0:${sDisplay}`;
      }
    } else {
      if (m > 0) {
        time = `${mDisplay}:${sDisplay}`;
      } else {
        time = `0:${sDisplay}`;
      }
    }
    return time;
  }

}
