import { Component, OnInit } from '@angular/core';
import { NavController, ModalController } from '@ionic/angular';
import { Router, NavigationEnd } from '@angular/router';
import { AssistantPage } from '../../assistant/assistant.page';

@Component({
  selector: 'footer-tabs',
  templateUrl: './footer-tabs.component.html',
  styleUrls: ['./footer-tabs.component.scss'],
})
export class FooterTabsComponent implements OnInit {

  currentUrl: string;
  selectedTab: number;

  constructor(
    private nav: NavController,
    private router: Router,
    private modal: ModalController,
  ) {
    router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
        this.setActiveTab(val.url);
      }
    });
  }

  ngOnInit() {
    this.setActiveTab(this.router.url);
  }

  setActiveTab(url: string) {
    if (url === '/home') {
      this.selectedTab = 1;
    } else if (url.startsWith('/schedule')) {
      this.selectedTab = 2;
    } else if (url.startsWith('/mailbox')) {
      this.selectedTab = 3;
    } else if (url.startsWith('/notifications')) {
      this.selectedTab = 4;
    } else {
      this.selectedTab = 0;
    }
  }

  switchTabs(path: string, tabIndex: number): void {
    this.selectedTab = tabIndex;
    this.nav.navigateForward(path);
  }

  async callSylvie() {
    const modal = await this.modal.create({
      component: AssistantPage,
      componentProps: { value: this.currentUrl },
    });
    return await modal.present();
  }

}
