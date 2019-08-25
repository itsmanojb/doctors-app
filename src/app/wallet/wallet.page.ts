import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.page.html',
  styleUrls: ['./wallet.page.scss'],
})
export class WalletPage implements OnInit {

  constructor(
    private nav: NavController,
    private title: Title,
  ) { }

  ngOnInit() {
    this.title.setTitle('PatMD Wallet');
  }

  goBack() {
    this.nav.back();
  }

}
