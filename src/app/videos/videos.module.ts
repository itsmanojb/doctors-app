import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';
import { ComponentsModule } from '../_components/components.module';
import { PipesModule } from '../_pipes/pipes.module';

import { VideosPage } from './videos.page';
import { VideoItemComponent } from './video-item/video-item.component';
import { FeedSkeletonComponent } from './feed-skeleton/feed-skeleton.component';

const routes: Routes = [
  {
    path: '',
    component: VideosPage,
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
    VideosPage,
    VideoItemComponent,
    FeedSkeletonComponent,
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class VideosPageModule { }
