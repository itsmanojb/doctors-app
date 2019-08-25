import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';
import { ComponentsModule } from '../_components/components.module';

import { WalletPage } from './wallet.page';

const routes: Routes = [
  {
    path: '',
    component: WalletPage,
  },
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    ComponentsModule,
  ],
  declarations: [WalletPage],
})
export class WalletPageModule { }
