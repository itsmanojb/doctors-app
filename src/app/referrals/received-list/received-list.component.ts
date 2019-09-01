import { Component, OnInit, Input } from '@angular/core';
import { ToastController, ModalController } from '@ionic/angular';

import { DataService } from 'src/app/_services/data.service';
import { ReferralsService } from '../referrals.service';
import { MatBottomSheet } from '@angular/material';
import { Observable } from 'rxjs';
import { ReferralComponent } from '../referral/referral.component';
import Referrals from '../../../assets/dummy/referrals.json';

@Component({
  selector: 'app-received-referrals-list',
  templateUrl: './received-list.component.html',
  styleUrls: ['./received-list.component.scss'],
})
export class ReceivedListComponent implements OnInit {

  private eventsSubscription: any
  @Input() refresh: Observable<void>;

  rawData = [];
  referrals = [];
  filterOn = false;
  noReferrals = true;
  dataLoading: boolean;


  constructor(
    private data: DataService,
    public refData: ReferralsService,
    private toast: ToastController,
    private modal: ModalController,
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
    this.dataLoading = true;

    const jsonData = Referrals;
    this.refData.arraySort(jsonData);
    this.prepareData(jsonData);

    setTimeout(() => {
      this.noReferrals = false;
      this.dataLoading = false;
    }, 2000);

  }

  prepareData(data: any) {
    // console.log(data);
    const allData = data.map((item: any) => {
      const doctor = this.data.getUser(item.referredBy, 'Doctor');
      const patient = this.data.getUser(item.patient, 'Patient');
      return {
        created: item.dtCreate,
        referral: item,
        practitioner: doctor,
        avatar: doctor.picture,
        patient: patient
      };
    });
    this.rawData = allData;
    // console.log(this.rawData);
    this.referrals = this.refData.doDatewiseGroup(allData);
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
        readOnly: false
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
