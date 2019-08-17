import { CommonModule } from '@angular/common';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FooterTabsComponent } from './footer-tabs/footer-tabs.component';

@NgModule({
  declarations: [
    FooterTabsComponent,
  ],
  imports: [
    CommonModule
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
  ],
  exports: [
    FooterTabsComponent,
  ]
})
export class ComponentsModule { }
