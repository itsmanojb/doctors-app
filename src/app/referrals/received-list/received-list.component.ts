import { Component, OnInit, Input } from '@angular/core';
import { Storage } from '@ionic/storage';
import { ToastController, ModalController } from '@ionic/angular';

import { DataService } from 'src/app/_services/data.service';
import { ReferralsService } from '../referrals.service';
import { MatBottomSheet } from '@angular/material';
import { Observable } from 'rxjs';
import { ReferralComponent } from '../referral/referral.component';

@Component({
  selector: 'app-received-referrals-list',
  templateUrl: './received-list.component.html',
  styleUrls: ['./received-list.component.scss'],
})
export class ReceivedListComponent implements OnInit {

  private eventsSubscription: any
  @Input() refresh: Observable<void>;

  userId: string;
  jwt: string;

  rawData = [];
  referrals = [];
  filterOn = false;
  noReferrals = true;
  dataLoading: boolean;

  // docDataUrl = patmdEndpoint.DoctorsProfileData;
  // patDataUrl = patmdEndpoint.PatientsProfileData;

  constructor(
    private data: DataService,
    public refData: ReferralsService,
    private toast: ToastController,
    private modal: ModalController,
    private storage: Storage,
    private bottomSheet: MatBottomSheet,
  ) { }

  ngOnInit() {
    this.eventsSubscription = this.refresh.subscribe(() => this.fetchReferrals());
    this.fetchReferrals();
  }

  ngOnDestroy() {
    this.eventsSubscription.unsubscribe();
  }

  async fetchReferrals() {
    // this.dataLoading = true;

    // const user: CuserUI = await this.storage.get('PMD_USER');
    // this.userId = user.userId;
    // this.jwt = user.jwt_token;

    // const url = patmdEndpoint.GetReferrals;
    // const payload = {
    //   'referredUserId': this.userId
    // };
    // this.data.postAPICallSecure(url, payload, this.jwt)
    //   .then(res => {
    //     const apiData = res as any[];
    //     if (apiData.length > 0) {
    //       this.noReferrals = false;
    //       this.refData.arraySort(apiData);
    //       this.prepareData(apiData);
    //     } else {
    //       this.noReferrals = true;
    //       this.dataLoading = false;
    //       this.presentToast('No referrals found.');
    //     }
    //   })
    //   .catch(err => {
    //     this.presentToast('Something went wrong. Try again later.');
    //   });
  }

  async prepareData(data: any) {
    // const promises = data.map(async (item: any) => {
    //   const docId = item.referredUserId === this.userId ? item.referrerUserId : item.referredUserId;
    //   const patId = item.patientUserId;
    //   const docData = await this.data.postAPICallSecure(this.docDataUrl, { userId: docId }, this.jwt);
    //   const patData = await this.data.postAPICallSecure(this.patDataUrl, { userId: patId }, this.jwt);
    //   return {
    //     created: item.dtCreate,
    //     referral: item,
    //     practitioner: docData[0],
    //     avatar: docData[0].tnfilerefId,
    //     patient: patData[0]
    //   };
    // });
    // const results = await Promise.all(promises);
    // this.rawData = results;

    // this.referrals = this.refData.doDatewiseGroup(results);
    // this.dataLoading = false;

  }

  async presentToast(message: string) {
    const toast = await this.toast.create({
      message,
      duration: 2000
    });
    toast.present();
  }

  openBottomSheet(referral): void {
    const sheet = this.bottomSheet.open(ReferralComponent, {
      panelClass: 'sheet-x',
      closeOnNavigation: true,
      data: {
        referral,
        readOnly: false,
        token: this.jwt,
        userId: this.userId
      },
    });
    sheet.afterDismissed().subscribe((data) => {
      if (data === 'error') {
        this.fetchReferrals();
        this.presentToast('Something went wrong. Try again later.');
      } else if (data === 'success') {
        this.fetchReferrals();
      }
    });
  }

}
