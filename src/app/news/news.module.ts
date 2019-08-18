import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';

import { IonicModule } from '@ionic/angular';
import { ComponentsModule } from '../_components/components.module';

import { NewsPage } from './news.page';
import { PipesModule } from '../_pipes/pipes.module';

const routes: Routes = [
  {
    path: '',
    component: NewsPage,
  },
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    ComponentsModule,
    PipesModule,
  ],
  declarations: [
    NewsPage,
  ],
  providers: [
    InAppBrowser
  ]
})
export class NewsPageModule { }
