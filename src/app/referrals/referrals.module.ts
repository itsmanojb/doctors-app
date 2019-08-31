import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';
import { ComponentsModule } from '../_components/components.module';
import { MaterialModule } from '../material.module';

import { ReferralsPage } from './referrals.page';
import { ReferralComponent } from './referral/referral.component';
import { NewReferralComponent } from './new-referral/new-referral.component';
import { ReceivedListComponent } from './received-list/received-list.component';
import { SentListComponent } from './sent-list/sent-list.component';
import { PipesModule } from '../_pipes/pipes.module';

const routes: Routes = [
  {
    path: '',
    component: ReferralsPage,
  },
  {
    path: 'new-referral',
    component: NewReferralComponent,
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
    ReferralsPage,
    ReferralComponent,
    NewReferralComponent,
    ReceivedListComponent,
    SentListComponent,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  entryComponents: [
    ReferralComponent,
  ],
})
export class ReferralsPageModule { }
