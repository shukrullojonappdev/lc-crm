import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-otp',
  templateUrl: './otp.component.html',
  styleUrl: './otp.component.scss'
})
export class OtpComponent implements OnInit {
  btnLoading: boolean = false;
  phone: string = '';
  otpForm = this.fb.group({
    otpCode: ['', [Validators.required, Validators.pattern(/\d \d \d \d/)]]
  });

  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.phone = this.route.snapshot.params['phone'];
  }

  checkOtp() {
    const tempCode = this.otpForm.value.otpCode.replaceAll(' ', '');
    if (this.otpForm.valid) {
      this.btnLoading = true;
      this.authService.checkOtp(tempCode, this.phone).subscribe((_) => {
        this.btnLoading = false;
        this.router.navigate(['/auth/register/info/', this.phone]);
      });
    }
  }
}
