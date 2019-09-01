import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Router, NavigationStart } from '@angular/router';
import { DataService } from '../../_services/data.service';

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
  ownPost: boolean;
  reviews: any[] = [];
  likes = 0;
  dislikes = 0;

  commented = false;
  pauseVideo: boolean;

  shortDescription = true;

  slideOpts = {
    slidesPerView: 2,
    grabCursor: true,
  };

  constructor(
    private modal: ModalController,
    private router: Router,
    private data: DataService,
  ) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        this.pauseVideo = true;
        this.modal.dismiss();
      }
    });
  }

  ngOnInit() {
    // console.log(this.video);
    this.prepareData(this.video.comments);
  }


  prepareData(data: any) {
    // console.log(data);
    const allData = data.map((item: any) => {
      const user = this.data.getUser(item.userId, 'Patient');
      return {
        id: item.id,
        userName: `${user.name.first} ${user.name.last}`,
        dtWhen: item.dtWhen,
        msg: item.msg,
        avatar: user.picture
      };
    });
    console.log(allData);
    this.reviews = allData.sort(this.compare);

  }

  compare(a, b) {
    if (a.dtWhen > b.dtWhen) {
      return -1;
    }
    return 0;
  }

  goBack() {
    this.modal.dismiss(null);
  }

}
