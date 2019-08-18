import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';
import { ComponentsModule } from '../_components/components.module';
import { MaterialModule } from '../material.module';

import { SchedulePage } from './schedule.page';
import { AppointmentComponent } from './appointment/appointment.component';
import { SlotItemComponent } from './slot-item/slot-item.component';

const routes: Routes = [
  {
    path: '',
    component: SchedulePage,
  },
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    ComponentsModule,
    MaterialModule,
  ],
  declarations: [
    SchedulePage,
    AppointmentComponent,
    SlotItemComponent,
  ],
  entryComponents: [
    AppointmentComponent,
  ]
})
export class SchedulePageModule { }
