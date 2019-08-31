import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Router, NavigationStart } from '@angular/router';

@Component({
  selector: 'app-video-details',
  templateUrl: './video-details.component.html',
  styleUrls: [
    '../video-item/video-item.component.scss',
    './video-details.component.scss',
  ],
})
export class VideoDetailsComponent implements OnInit {

  @ViewChild('input') input: ElementRef;

  video: any;
  userId: string;
  handle: string;
  hanType: string;
  token: string;
  userImgId: string;
  bizLogoId: string;
  ownPost: boolean;
  topics: any[] = [];

  reviews: any[] = [];
  likes = 0;
  dislikes = 0;

  commented = false;
  pauseVideo: boolean;

  slideOpts = {
    slidesPerView: 2,
    grabCursor: true,
  };

  constructor(
    private modal: ModalController,
    private router: Router,
  ) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        this.pauseVideo = true;
        this.modal.dismiss();
      }
    });
  }

  ngOnInit() { }

  goBack() {
    this.modal.dismiss(null);
  }

}
