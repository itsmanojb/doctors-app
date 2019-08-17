import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { ToastController, NavController } from '@ionic/angular';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  returnUrl: string;
  loginForm: FormGroup;
  pwHidden = true;
  loginBtnText = 'Sign in';
  formSubmitted = false;

  constructor(
    private title: Title,
    private route: ActivatedRoute,
    private toast: ToastController,
    private nav: NavController,
  ) {
    this.loginForm = new FormGroup({
      userId: new FormControl('', [Validators.required, Validators.email]),
      pw: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit() {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/home';
  }

  ionViewDidEnter() {
    this.title.setTitle('Sign in');
  }

  getErrorMessage() {
    return this.loginForm.controls['userId'].hasError('required')
      ? 'Please enter UserId'
      : this.loginForm.controls['userId'].hasError('email')
      ? 'UserId must be a valid email'
      : this.loginForm.controls['pw'].hasError('required')
      ? 'Enter Password'
      : '';
  }

  onSubmit() {
    this.loginBtnText = 'Signing in...';
    this.formSubmitted = true;

    const loginData = {
      userId: this.loginForm.value.userId,
      pw: this.loginForm.value.pw,
    };

    // Demo Login
    setTimeout(() => {
      if (loginData.userId === environment.credentials.login.userid 
        && loginData.pw === environment.credentials.login.password) {
        this.nav.navigateForward('/home');
      } else {
        this.presentToast('Invalid Login Credentials.');
        this.loginBtnText = 'Sign in';
        this.formSubmitted = false;
      }
    }, 3000);

  }

  async presentToast(message: string) {
    const toast = await this.toast.create({
      message,
      duration: 3000,
    });
    toast.present();
  }
}
