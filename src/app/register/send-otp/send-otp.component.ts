import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { InteractionService } from './../../_services/interaction.service';
import { NavController } from '@ionic/angular';

// import dialCodesJson from '../../../assets/dummy/dialCodes.json';

@Component({
  selector: 'app-send-otp',
  templateUrl: './send-otp.component.html',
  styleUrls: ['./send-otp.component.scss'],
})
export class SendOtpComponent implements OnInit {
  mobileNoForm: FormGroup;
  formSubmitted = false;

  isdCodes = [
    {
      name: 'India',
      dial_code: '+91',
      code: 'IN',
    },
    {
      name: 'United Arab Emirates',
      dial_code: '+971',
      code: 'AE',
    },
    {
      name: 'United Kingdom',
      dial_code: '+44',
      code: 'GB',
    },
    {
      name: 'United States',
      dial_code: '+1',
      code: 'US',
    },
  ];

  mobileErrMsg = '';
  mobileError = false;

  constructor(
    private title: Title,
    private interact: InteractionService,
    private nav: NavController,
    ) {
    this.mobileNoForm = new FormGroup({
      isdCode: new FormControl('', Validators.required),
      mobileNo: new FormControl('', [
        Validators.required,
        Validators.pattern(/^0|[1-9]\d*$/),
        Validators.maxLength(10),
        Validators.minLength(5),
      ]),
    });
  }

  ngOnInit() {
    const lowCodes = this.isdCodes.map(a => {
      a.code = a.code.toLowerCase();
      return a;
    });
    this.isdCodes = lowCodes.sort((a, b) => a.name.localeCompare(b.name));
  }

  ionViewDidEnter() {
    this.title.setTitle('Step 1 | Doctor Registration');
  }

  async checkMobile() {}

  async onSubmit(e) {
    this.formSubmitted = true;
    this.interact.changeAllowance(true);
    setTimeout(() => {
      this.nav.navigateForward('/register/associate-email');
    }, 1500);
  }
}
