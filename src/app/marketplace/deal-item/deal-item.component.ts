import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-deal-item',
  templateUrl: './deal-item.component.html',
  styleUrls: ['./deal-item.component.scss']
})
export class DealItemComponent implements OnInit {

  @Input() deal: any;
  @Output() dealSelect = new EventEmitter();

  offPercent: number;
  dealImage: string;

  constructor() {
  }

  ngOnInit() {
    const off = this.deal.oldPrice - this.deal.newPrice;
    this.offPercent = Math.ceil((off * 100) / this.deal.oldPrice);
    this.dealImage = this.deal.media.length > 0 ? this.deal.media[0].url : '';
  }

  dealClicked() {
    this.dealSelect.emit();
  }
}
