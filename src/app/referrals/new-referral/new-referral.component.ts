import { Component, OnInit } from '@angular/core';
import { NavController, ModalController, ToastController } from '@ionic/angular';
import { Title } from '@angular/platform-browser';

import { ContactPickerComponent } from '../../_components/contact-picker/contact-picker.component';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DataService } from 'src/app/_services/data.service';
import { Storage } from '@ionic/storage';
import { CreferralUI } from '../referrals.interface';

@Component({
  selector: 'app-new-referral',
  templateUrl: './new-referral.component.html',
  styleUrls: ['./new-referral.component.scss'],
})
export class NewReferralComponent implements OnInit {

  private readonly recentReferralsURL = `deals/getreferrals`;
  private readonly getContactsURL = `users/getcontacts`;

  jwt: string;
  userId: string;

  referrerUserId = '';
  referredUserId = '';
  referredUserName = '';
  patientUserId = '';
  patientUserName = '';
  recipientName = '';

  referralForm: FormGroup;
  formSubmitted = false;

  recentDocs: string[] = [];
  quickSelected = '';

  constructor(
    private nav: NavController,
    private store: Storage,
    private data: DataService,
    private title: Title,
    private modal: ModalController,
    private toast: ToastController,
  ) {
    this.referralForm = new FormGroup({
      referredUserId: new FormControl(),
      referredUserName: new FormControl('', [Validators.required]),
      patientUserId: new FormControl(),
      patientUserName: new FormControl('', [Validators.required]),
      msgReferral: new FormControl('', [Validators.required])
    })
  }

  ngOnInit() {
    this.title.setTitle('New Referral');
    this.getRecentDoctors();
  }

  async getRecentDoctors() {
    // const user: CuserUI = await this.store.get('PMD_USER');
    // this.userId = user.userId;
    // this.jwt = user.jwt_token;
    // const refData = await this.data.postAPICallSecure(this.recentReferralsURL, {
    //   referrerUserId: this.userId,
    //   referredUserId: this.userId
    // }, this.jwt);
    // const referrals = refData as any[];
    // const doctorIds = referrals.map(referral => {
    //   if (referral.referrerUserId === this.userId) {
    //     return referral.referredUserId;
    //   } else if (referral.referredUserId === this.userId) {
    //     return referral.referrerUserId;
    //   }
    // })
    // const uniqueIds = doctorIds.filter((x, i, a) => a.indexOf(x) == i);
    // this.data.postAPICallSecure(
    //   this.getContactsURL,
    //   {
    //     userId: this.userId,
    //     hanType: 'M',
    //     incgenlist: uniqueIds.slice(0, 5)
    //   },
    //   this.jwt
    // ).then((res) => {
    //   this.recentDocs = res as any[];
    //   // console.log(this.recentDocs)
    // })
  }

  async openDoctorPicker() {
    const modal = await this.modal.create({
      component: ContactPickerComponent,
      componentProps: {
        contactType: 'Doctor',
        multiselect: false
      }
    });
    modal.onDidDismiss()
      .then((res: any) => {
        const data = res.data;
        // console.log(data);
        if (data) {
          this.referralForm.get('referredUserName').setValue(data.texts[0]);
          this.referralForm.get('referredUserId').setValue(data.ids[0]);
          this.quickSelected = '';
        }
      });
    return await modal.present();
  }

  async openPatientPicker() {
    const modal = await this.modal.create({
      component: ContactPickerComponent,
      componentProps: {
        contactType: 'Patient',
        multiselect: false
      }
    });
    modal.onDidDismiss()
      .then((res: any) => {
        const data = res.data;
        if (data) {
          this.referralForm.get('patientUserName').setValue(data.texts[0]);
          this.referralForm.get('patientUserId').setValue(data.ids[0]);
        }
      });
    return await modal.present();
  }

  quickSelectDoc(doc: any) {
    if (this.quickSelected === doc.userId) {
      this.referralForm.get('referredUserName').setValue('');
      this.referralForm.get('referredUserId').setValue('');
      this.quickSelected = '';
    } else {
      this.referralForm.get('referredUserName').setValue(`${doc.demog.userFName} ${doc.demog.userMName} ${doc.demog.userLName}`);
      this.referralForm.get('referredUserId').setValue(doc.userId);
      this.quickSelected = doc.userId;
    }
  }

  referralPriority: any = {
    header: 'Set Priority',
  };

  submit() {
    this.disableControls();
    const date = new Date();
    this.formSubmitted = true;
    const referral: CreferralUI = {
      referrerUserId: this.userId,
      referredUserId: this.referralForm.get('referredUserId').value,
      patientUserId: this.referralForm.get('patientUserId').value,
      msgReferral: this.referralForm.get('msgReferral').value,
      state: 1
    };

    const payload = {
      referral,
      ymd: {
        'year': date.getFullYear(),
        'month': date.getMonth() + 1,
        'day': date.getDate()
      }
    };
    // const url = patmdEndpoint.NewReferral;
    // this.data.postAPICallSecure(url, payload, this.jwt, false)
    //   .then(() => {
    //     this.nav.navigateBack(['referrals'], { queryParams: { refresh: 1 } })
    //   })
    //   .catch((err) => {
    //     this.nav.navigateBack(['referrals']).then(() => {
    //       this.presentToast('Something went wrong. Try again later.');
    //     });
    //   });
  }

  async presentToast(message: string) {
    const toast = await this.toast.create({
      message,
      duration: 2000
    });
    toast.present();
  }

  disableControls() {
    this.referralForm.get('referredUserName').disable();
    this.referralForm.get('patientUserName').disable();
    this.referralForm.get('msgReferral').disable();
  }

  goBack() {
    this.nav.back();
  }

}
