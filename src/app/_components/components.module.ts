import { CommonModule } from '@angular/common';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FooterTabsComponent } from './footer-tabs/footer-tabs.component';
import { TopicsComponent } from './topics/topics.component';

@NgModule({
  declarations: [
    FooterTabsComponent,
    TopicsComponent
  ],
  imports: [
    CommonModule
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
  ],
  exports: [
    FooterTabsComponent,
    TopicsComponent
  ],
  entryComponents:[
    TopicsComponent
  ]
})
export class ComponentsModule { }
