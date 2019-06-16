import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { AlertController } from '@ionic/angular';

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
  formSubmitted = false;

  constructor(
    private title: Title,
    private alert: AlertController,
  ) { }

  ngOnInit() {
  }

  ionViewDidEnter() {
    this.title.setTitle('Step 3 | Doctor Registration');
  }

  canDeactivate(): boolean | Promise<boolean> {
    return this.confirmCancel();
  }

  async confirmCancel() {
    const alert = await this.alert.create({
      header: 'Hang on!',
      message: `If you leave this page, changes made by you will be lost.
       Are you sure that you want to leave this page?`,
      buttons: [
        {
          text: 'No',
          role: 'cancel',
        }, {
          text: 'Yes',
          role: 'proceed',
        },
      ],
    });
    await alert.present();
    return await alert.onDidDismiss().then(res => res.role === 'proceed');
  }

}
