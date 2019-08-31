import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { VidDataService } from '../vid-data.service';

@Component({
  selector: 'app-video-item',
  templateUrl: './video-item.component.html',
  styleUrls: ['./video-item.component.scss'],
})
export class VideoItemComponent implements OnInit {

  @Input('video') v: any;
  @Output() onVideoClick = new EventEmitter();

  constructor(
    public vData: VidDataService
  ) { }

  ngOnInit() {
    // console.log(this.v);
  }

  videoClick() {
    this.onVideoClick.emit(true);
  }

}
