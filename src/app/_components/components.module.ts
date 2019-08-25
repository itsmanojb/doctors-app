import { CommonModule } from '@angular/common';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FooterTabsComponent } from './footer-tabs/footer-tabs.component';
import { TopicsComponent } from './topics/topics.component';
import { ContactPickerComponent } from './contact-picker/contact-picker.component';

@NgModule({
  declarations: [
    ContactPickerComponent,
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
    ContactPickerComponent,
    FooterTabsComponent,
    TopicsComponent
  ],
  entryComponents: [
    ContactPickerComponent,
    TopicsComponent
  ]
})
export class ComponentsModule { }
