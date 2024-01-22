import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './register.component';
import { PhoneComponent } from './steps/phone/phone.component';
import { OtpComponent } from './steps/otp/otp.component';
import { InfoComponent } from './steps/info/info.component';
import { regStepGuard } from 'src/app/guard/reg-step.guard';
const routes: Routes = [
  {
    path: '',
    component: RegisterComponent,
    children: [
      {
        path: 'phone',
        canActivate: [regStepGuard],
        component: PhoneComponent
      },
      {
        path: 'otp/:phone',
        canActivate: [regStepGuard],
        component: OtpComponent
      },
      {
        path: 'info/:phone',
        canActivate: [regStepGuard],
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
