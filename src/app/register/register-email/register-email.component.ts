import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-register-email',
  templateUrl: './register-email.component.html',
  styleUrls: ['./register-email.component.scss'],
})
export class RegisterEmailComponent implements OnInit {

  pwHidden = true;
  loginCredentialForm: FormGroup;
  emailErrMsg = '';

  constructor(
    private title: Title,
  ) {
    this.loginCredentialForm = new FormGroup({
      userId: new FormControl('', [Validators.required, Validators.email]),
      pw: new FormControl('', [
        Validators.required,
        Validators.pattern(/^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/),
        Validators.minLength(8),
      ]),
    });
  }

  ngOnInit() {
  }

  ionViewDidEnter() {
    this.title.setTitle('Step 2 | Doctor Registration');
  }

}
