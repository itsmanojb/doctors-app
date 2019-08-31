import { Component, OnInit, Input } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { MatBottomSheet } from '@angular/material';
import { Observable } from 'rxjs';

import { ReferralComponent } from '../referral/referral.component';

@Component({
  selector: 'app-sent-referrals-list',
  templateUrl: './sent-list.component.html',
  styleUrls: [
    '../received-list/received-list.component.scss'
  ],
})
export class SentListComponent implements OnInit {

  private eventsSubscription: any
  @Input() refresh: Observable<void>;

  userId: string;
  jwt: string;

  rawData = [];
  referrals = [];
  filterOn = false;
  noReferrals = true;
  dataLoading: boolean;


  constructor(
    private toast: ToastController,
    private bottomSheet: MatBottomSheet,
  ) { }


  ngOnInit() {
    this.eventsSubscription = this.refresh.subscribe(() => this.fetchReferrals());
    this.fetchReferrals();
  }

  ngOnDestroy() {
    this.eventsSubscription.unsubscribe();
  }

  fetchReferrals() {
    this.dataLoading = true;

    setTimeout(() => {
      this.dataLoading = false;
      this.noReferrals = true;
      // this.presentToast('No referrals found.');
    }, 1000);

  }

  async presentToast(message: string) {
    const toast = await this.toast.create({
      message,
      duration: 2000
    });
    toast.present();
  }

  openBottomSheet(referral): void {
    this.bottomSheet.open(ReferralComponent, {
      panelClass: 'sheet-x',
      closeOnNavigation: true,
      data: {
        referral,
        readOnly: true,
        token: this.jwt,
        userId: this.userId
      },
    });
  }

}
