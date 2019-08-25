import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { routerTransition } from '../router.animations';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  animations: [routerTransition],
})
export class RegisterPage {

  constructor(private title: Title) { }

  ionViewDidEnter() {
    this.title.setTitle('Doctor Registration');
  }

  getState(outlet) {
    return outlet.activatedRouteData.state;
  }

  // canDeactivate(): Observable<boolean> | boolean {
  //   return this.dialog.confirm(
  // 'If you leave this page all your form data will be discarded. Are you sure to cancel signup?');
  // }

}
