import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ModalController } from '@ionic/angular';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';

import { SearchComponent } from '../_components/search/search.component';
import { environment } from '../../environments/environment';
import { DataService } from '../_services/data.service';

interface NewsAPIArticle {
  author: string;
  content: string;
  description: string;
  publishedAt: string;
  source: {
    id: string;
    name: string;
  }
  title: string;
  url: string;
  urlToImage: string;
}

@Component({
  selector: 'app-news',
  templateUrl: './news.page.html',
  styleUrls: ['./news.page.scss'],
})
export class NewsPage implements OnInit {

  private readonly newsURL = environment.NEWSAPI.HEADLINES_URL;
  private readonly newsapiKey = environment.NEWSAPI.API_KEY;

  newsArticles: NewsAPIArticle[] = [];
  allNewsArticles: NewsAPIArticle[] = [];
  featuredArticle: NewsAPIArticle;

  hideMoreLink = false;
  dataLoading: boolean;
  noNews: boolean;

  constructor(
    private title: Title,
    private modal: ModalController,
    private data: DataService,
    private iab: InAppBrowser
  ) { }

  ngOnInit() {
    this.title.setTitle('Newsstand');
    this.getNewsHeadlines();
  }

  getNewsHeadlines() {
    this.dataLoading = true;
    const url = `${this.newsURL}?country=in&category=health&apiKey=${this.newsapiKey}`;
    this.data.externalGetAPICall(url).then((res) => {
      const newsData = res;
      const total = 20;
      const random = Math.floor(Math.random() * (total + 1));
      let news = newsData.articles as any[];

      this.noNews = news.length > 0 ? false : true;

      this.featuredArticle = news[random];
      news.splice(random, 1);
      this.newsArticles = news.slice(1, 10);
      this.allNewsArticles = news;
      this.dataLoading = false;

    }).catch((err) => {
      console.log(err);
      this.noNews = true;
    });
  }

  showMore() {
    this.hideMoreLink = true;
    this.newsArticles = this.allNewsArticles;
  }

  openExternalLink(link: string) {
    const browser = this.iab.create(link);
    browser.close();
  }

  async initSearch() {
    const modal = await this.modal.create({
      component: SearchComponent,
    });
    return await modal.present();
  }

  openSettings(): any {
    throw new Error('Method not implemented.');
  }

}
