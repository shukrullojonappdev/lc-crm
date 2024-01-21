import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterRoutingModule } from './register-routing.module';

// Component modules
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PasswordModule } from 'primeng/password';
import { RegisterComponent } from './register.component';
import { PhoneComponent } from './steps/phone/phone.component';
import { OtpComponent } from './steps/otp/otp.component';
import { InfoComponent } from './steps/info/info.component';
import { InputMaskModule } from 'primeng/inputmask';
import { ToastModule } from 'primeng/toast';

// Services
import { MessageService } from 'primeng/api';

@NgModule({
  imports: [
    CommonModule,
    RegisterRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ButtonModule,
    InputTextModule,
    PasswordModule,
    InputMaskModule,
    ToastModule
  ],
  providers: [MessageService],
  declarations: [RegisterComponent, PhoneComponent, OtpComponent, InfoComponent]
})
export class RegisterModule {}
