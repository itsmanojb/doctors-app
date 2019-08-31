import { Component, OnInit } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import { Title } from '@angular/platform-browser';

import { VideoDetailsComponent } from './video-details/video-details.component';
import { SearchComponent } from '../_components/search/search.component';
import { VidDataService } from './vid-data.service';
import { SETTINGS } from '../app.global';

@Component({
  selector: 'app-videos',
  templateUrl: './videos.page.html',
  styleUrls: ['./videos.page.scss'],
})
export class VideosPage implements OnInit {

  private readonly initialVideosCount: number;
  private readonly paginationCount: number;

  emptyFeed: boolean;
  feedLoading: boolean;
  hasMoreData: boolean;

  startIndex: number;
  fetchUpto: number;
  videos: any[] = [];

  constructor(
    private title: Title,
    private modal: ModalController,
    private nav: NavController,
    private data: VidDataService,
  ) {
    this.initialVideosCount = SETTINGS.feed.initialVideosCount;
    this.paginationCount = SETTINGS.feed.videosOnScrollCount;
  }

  ngOnInit() {
    this.title.setTitle('Educational Videos');
    this.getVideos();
  }

  async playVideo(video: any) {
    const modal = await this.modal.create({
      component: VideoDetailsComponent,
      componentProps: {
        video
      },
    });
    return await modal.present();
  }

  getVideos(): void {
    this.startIndex = 1;
    this.fetchUpto = this.initialVideosCount;
    this.feedLoading = true;
    const feedData = this.data.getVideos(this.startIndex, this.initialVideosCount);
    this.emptyFeed = feedData.length === 0 ? true : false;
    this.hasMoreData = feedData.length > this.initialVideosCount ? true : false;
    this.videos = feedData;
    setTimeout(() => {
      this.feedLoading = false;
    }, 6000);

  }

  loadMore(event): void {
    this.startIndex += this.startIndex;
    const feedData = this.data.getVideos(this.startIndex, this.paginationCount);
    if (feedData.length > 0) {
      setTimeout(() => {
        this.videos = this.videos.concat(feedData);
        event.target.complete();
      }, 750);
    } else {
      event.target.disabled = true;
    }
  }

  doRefresh(event): void {
    this.videos = [];
    this.getVideos();
    event.target.complete();
  }

  async initSearch() {
    const modal = await this.modal.create({
      component: SearchComponent,
    });
    return await modal.present();
  }

  openVideoDetail(event) {
    this.nav.navigateForward(['/videos/channel/', 123]);
  }

}
