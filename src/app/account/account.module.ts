import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';
import { ComponentsModule } from '../_components/components.module';

import { AccountPage } from './account.page';
import { ProfileComponent } from './profile/profile.component';
import { ProfileSkeletonComponent } from './profile/skel.component';

const routes: Routes = [
  {
    path: '',
    component: AccountPage,
  }, {
    path: 'my-profile',
    component: ProfileComponent,
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    ComponentsModule,
  ],
  declarations: [
    AccountPage,
    ProfileComponent,
    ProfileSkeletonComponent,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AccountPageModule {}
