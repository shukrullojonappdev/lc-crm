import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import { MessageService } from 'primeng/api';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-phone',
  templateUrl: './phone.component.html',
  styleUrl: './phone.component.scss'
})
export class PhoneComponent {
  phoneForm = this.fb.group({
    phone: ['', [Validators.required]]
  });
  invalidPhone: boolean = false;
  btnLoading: boolean = false;

  resDetatail = 'Phone number already exist';

  constructor(
    private authService: AuthService,
    private router: Router,
    private messageService: MessageService,
    private fb: FormBuilder
  ) {}

  sendOtp() {
    const tempPhone = this.phoneForm.value.phone.replaceAll('-', '');
    if (
      this.phoneForm.valid &&
      this.authService.validatePhoneNumber(tempPhone)
    ) {
      this.btnLoading = true;
      this.invalidPhone = false;
      this.authService.sendOtp(tempPhone).subscribe((res: any) => {
        if (res.message === 'SMS sent successfully') {
          this.btnLoading = false;
          this.router.navigate(['/auth/register/otp', tempPhone]);
        }
        if (res.detail === 'phone number already exist') {
          this.btnLoading = false;
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: this.resDetatail
          });
        }
      });
    } else {
      this.invalidPhone = true;
    }
  }
}
