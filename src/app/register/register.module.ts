import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';
import { MaterialModule } from '../material.module';

import { RegisterPage } from './register.page';
import { SendOtpComponent } from './send-otp/send-otp.component';
import { RegisterEmailComponent } from './register-email/register-email.component';
import { SignupFormComponent } from './signup-form/signup-form.component';

import { OtpGuard } from './../_guards/otp.guard';
import { CanDeactivateGuard } from '../_guards/can-deactivate.guard';

const routes: Routes = [
  {
    path: '',
    component: RegisterPage,
    children: [
      {
        path: '',
        redirectTo: 'verify-mobile',
      },
      {
        path: 'verify-mobile',
        data: {
          state: 1,
        },
        component: SendOtpComponent,
      },
      {
        path: 'associate-email',
        canActivate: [OtpGuard],
        data: {
          state: 2,
          prev: '/register/verify-mobile',
        },
        component: RegisterEmailComponent,
      },
      {
        path: 'create-profile',
        canActivate: [OtpGuard],
        canDeactivate: [CanDeactivateGuard],
        data: {
          state: 3,
          prev: '/register/associate-email',
        },
        component: SignupFormComponent,
      },
    ],
  },
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    MaterialModule,
  ],
  declarations: [
    RegisterPage,
    SendOtpComponent,
    RegisterEmailComponent,
    SignupFormComponent,
  ],
})
export class RegisterPageModule {}
