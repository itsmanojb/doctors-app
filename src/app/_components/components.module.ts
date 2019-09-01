import { CommonModule } from '@angular/common';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FooterTabsComponent } from './footer-tabs/footer-tabs.component';
import { TopicsComponent } from './topics/topics.component';
import { ContactPickerComponent } from './contact-picker/contact-picker.component';
import { SkeletonComponent } from './skeleton/skeleton.component';
import { VideoDetailsComponent } from '../videos/video-details/video-details.component';

@NgModule({
  declarations: [
    ContactPickerComponent,
    FooterTabsComponent,
    TopicsComponent,
    SkeletonComponent,
    VideoDetailsComponent,
  ],
  imports: [
    CommonModule
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
  ],
  exports: [
    ContactPickerComponent,
    FooterTabsComponent,
    TopicsComponent,
    SkeletonComponent,
    VideoDetailsComponent,
  ],
  entryComponents: [
    ContactPickerComponent,
    TopicsComponent,
    VideoDetailsComponent,
  ]
})
export class ComponentsModule { }
