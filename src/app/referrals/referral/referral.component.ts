import { Component, OnInit, Inject } from '@angular/core';
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material';
import { ReferralsService } from '../referrals.service';
import { SafeUrl, DomSanitizer } from '@angular/platform-browser';
import { DataService } from 'src/app/_services/data.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-referral',
  templateUrl: './referral.component.html',
  styleUrls: ['./referral.component.scss'],
})
export class ReferralComponent implements OnInit {

  // private readonly updateRefURL = patmdEndpoint.UpdateReferral;

  acted: boolean;
  accepted: boolean;
  showChoices: boolean;

  pendingReferral: boolean;
  newReferral: boolean;
  hasMessage: boolean;
  referralState: string;

  refData: any;
  referral: any;
  userId = 2;
  imgUrl: SafeUrl = this.sanitizer.bypassSecurityTrustUrl('assets/images/avatar.jpg');

  replyReferralForm: FormGroup;
  formSubmitted = false;

  constructor(
    public ref: ReferralsService,
    private sanitizer: DomSanitizer,
    private bottomSheetRef: MatBottomSheetRef<ReferralComponent>,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: any,
    // private _changeDetectorRef: ChangeDetectorRef
  ) {

    this.acted = false;
    this.refData = data.referral;
    this.referral = data.referral.referral;
    this.replyReferralForm = new FormGroup({
      replyMsg: new FormControl('', [Validators.maxLength(200)]),
    });
  }

  cancel(event: MouseEvent): void {
    this.bottomSheetRef.dismiss(null);
    event.preventDefault();
  }

  ngOnInit() {
    console.log(this.referral);

    if (this.referral.referredBy === this.userId) {
      if (this.referral.state === 1) {
        this.pendingReferral = true;
      }
    } else {
      if (this.referral.state === 1) {
        this.newReferral = true;
      }
    }

    if (this.referral.responseMsg || this.referral.referralMsg) {
      this.hasMessage = true;
    }

    switch (this.referral.state) {
      case 1: this.referralState = 'Pending';
        break;
      case 2: this.referralState = 'Accepted';
        break;
      case 3: this.referralState = 'Declined';
        break;
      case 4: this.referralState = 'Scheduled';
        break;
      case 5: this.referralState = 'Visited';
        break;
      default:
    }
    this.showChoices = !this.data.readOnly && this.newReferral && !this.acted ? true : false;
  }

  act(arg: string) {
    this.acted = true;
    this.accepted = arg === 'accept' ? true : false;
  }

  onSubmit(e) {
    // const params = {
    //   userId: this.userId,
    //   statetext: e.value.replyMsg || '',
    //   refId: this.referral.referral.refId,
    //   state: this.accepted ? 2 : 3
    // };
    this.formSubmitted = true;
    this.replyReferralForm.get('replyMsg').disable();
    // this.fetch.postAPICallSecure(this.updateRefURL, params, this.jwt, false)
    //   .then(() => {
    //     this.bottomSheetRef.dismiss('success');
    //     event.preventDefault();
    //   }).catch((err) => {
    //     this.bottomSheetRef.dismiss('error');
    //     event.preventDefault();
    //   })
  }

}
