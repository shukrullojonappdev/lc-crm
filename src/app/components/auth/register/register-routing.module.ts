import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './register.component';
import { PhoneComponent } from './steps/phone/phone.component';
import { OtpComponent } from './steps/otp/otp.component';
import { InfoComponent } from './steps/info/info.component';

const routes: Routes = [
  {
    path: '',
    component: RegisterComponent,
    children: [
      {
        path: 'phone',
        component: PhoneComponent
      },
      {
        path: 'otp/:phone',
        component: OtpComponent
      },
      {
        path: 'info/:phone',
        component: InfoComponent
      },
      {
        path: '',
        redirectTo: 'phone',
        pathMatch: 'prefix'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegisterRoutingModule {}
