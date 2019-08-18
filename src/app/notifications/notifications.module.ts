import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';
import { MaterialModule } from '../material.module';
import { ComponentsModule } from '../_components/components.module';

import { NotificationsPage } from './notifications.page';
import { SettingsComponent } from './settings/settings.component';
import { PipesModule } from '../_pipes/pipes.module';

const routes: Routes = [
  {
    path: '',
    component: NotificationsPage,
  },
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    ComponentsModule,
    MaterialModule,
    PipesModule,
  ],
  declarations: [
    NotificationsPage,
    SettingsComponent,
  ],
  entryComponents: [
    SettingsComponent,
  ],
})
export class NotificationsPageModule { }
