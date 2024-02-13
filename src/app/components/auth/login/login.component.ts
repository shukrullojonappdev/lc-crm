import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AuthService } from 'src/app/service/auth.service';
import { LayoutService } from 'src/app/layout/service/app.layout.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
    `
      :host ::ng-deep .pi-eye,
      :host ::ng-deep .pi-eye-slash {
        transform: scale(1.6);
        margin-right: 1rem;
        color: var(--primary-color) !important;
      }

      :host ::ng-deep .p-inputtext {
        width: 100%;
      }

      :host ::ng-deep .p-inputwrapper {
        width: 100%;
      }
    `
  ]
})
export class LoginComponent {
  loginForm = this.fb.group({
    phone: ['', [Validators.required]],
    password: ['', [Validators.required]],
    rememberMe: [false]
  });
  btnLoading: boolean = false;
  invalidPhone: boolean = false;

  constructor(
    public layoutService: LayoutService,
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder,
    private messageService: MessageService
  ) {}

  login() {
    const tempPhone = this.loginForm.value.phone.replaceAll('-', '');
    if (
      this.loginForm.valid &&
      this.authService.validatePhoneNumber(tempPhone)
    ) {
      this.btnLoading = true;
      this.invalidPhone = false;
      this.authService
        .login(tempPhone, this.loginForm.value.password)
        .subscribe(
          (res: any) => {
            this.btnLoading = false;
            this.authService
              .setTokensAndPhone(
                res,
                this.loginForm.value.rememberMe,
                tempPhone
              )
              .then(() => {
                this.router.navigate(['/']);
              });
          },
          (err) => {
            this.btnLoading = false;
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: err.detail
            });
          }
        );
    } else {
      this.invalidPhone = true;
    }
  }
}
