import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { AlertController, NavController } from '@ionic/angular';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { InteractionService } from './../../_services/interaction.service';

@Component({
  selector: 'app-signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.scss'],
})
export class SignupFormComponent implements OnInit {
  showHint = false;
  latitude: number;
  longitude: number;

  btnText = 'Submit';
  signupForm: FormGroup;
  formSubmitted = false;

  constructor(
    private title: Title,
    private alert: AlertController,
    private nav: NavController,
    private interact: InteractionService,
  ) {
    this.signupForm = new FormGroup({
      name: new FormControl('', Validators.required),
      bname: new FormControl(),
    });
  }

  ngOnInit() {}

  ionViewDidEnter() {
    this.title.setTitle('Step 3 | Doctor Registration');
  }

  // canDeactivate(): boolean | Promise<boolean> {
  //   return this.confirmCancel();
  // }

  // async confirmCancel() {
  //   const alert = await this.alert.create({
  //     header: 'Hang on!',
  //     message: `If you leave this page, changes made by you will be lost.
  //      Are you sure that you want to leave this page?`,
  //     buttons: [
  //       {
  //         text: 'No',
  //         role: 'cancel',
  //       },
  //       {
  //         text: 'Yes',
  //         role: 'proceed',
  //       },
  //     ],
  //   });
  //   await alert.present();
  //   return await alert.onDidDismiss().then(res => res.role === 'proceed');
  // }

  async onSubmit(e) {
    this.formSubmitted = true;
    this.interact.changeAllowance(false);
    if (!this.signupForm.get('bname').value) {
      this.signupForm.get('bname').setValue(this.signupForm.get('name').value);
    }
    setTimeout(() => {
      this.nav.navigateForward('/home');
    }, 2500);
  }
}
