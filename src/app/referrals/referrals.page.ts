import { Component, OnInit, ViewChild } from '@angular/core';
import { NavController, ModalController } from '@ionic/angular';
import { Title } from '@angular/platform-browser';
import { MatTabGroup } from '@angular/material';
import { Subject } from 'rxjs';
import { SearchComponent } from '../_components/search/search.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-referrals',
  templateUrl: './referrals.page.html',
  styleUrls: ['./referrals.page.scss'],
})
export class ReferralsPage implements OnInit {

  @ViewChild(MatTabGroup) tabGroup: MatTabGroup;

  private refreshNeeded: Subject<void> = new Subject<void>();

  constructor(
    private nav: NavController,
    private title: Title,
    private modal: ModalController,
    private route: ActivatedRoute,
  ) {
    this.route.queryParams.subscribe((params) => {
      if (params['refresh']) {
        this.tabGroup.selectedIndex = params['refresh'];
        this.refreshNeeded.next();
      }
    })
  }

  ngOnInit() {
    this.title.setTitle('Referrals');

  }

  newReferral() {
    this.nav.navigateForward('/referrals/new-referral');
  }

  doRefresh(event) {
    this.refreshNeeded.next();
    event.target.complete();
  }

  async initSearch() {
    const modal = await this.modal.create({
      component: SearchComponent,
    });
    return await modal.present();
  }

}
