import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-error',
  templateUrl: './error.page.html',
  styleUrls: ['./error.page.scss'],
})
export class ErrorPage implements OnInit {

  constructor(
    private title: Title,
    private nav: NavController,
  ) { }

  ionViewDidEnter() {
    this.title.setTitle('Not found');
  }

  ngOnInit() {
  }

  goBack() {
    this.nav.back();
  }

  goHome() {
    this.nav.navigateRoot('/home');
  }

}
