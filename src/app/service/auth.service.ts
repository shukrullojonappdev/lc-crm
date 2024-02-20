import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

type RegSteps = 'phone' | 'otp' | 'info';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  refreshToken: string = '';
  accessToken: string = '';
  registerSteps: RegSteps = 'phone';
  dataIn: 'local' | 'session' | null = null;

  constructor(private http: HttpClient, private router: Router) {}

  sendOtp(phone: string) {
    const tempPhone = phone.replaceAll('-', '');
    this.registerSteps = 'otp';
    sessionStorage.setItem('regStep', this.registerSteps);
    return this.http.post(
      `${environment.apiUrl}/api/sentOTP/`,
      {
        phone_number: tempPhone
      },
      { headers: { Anonymous: 'true' } }
    );
  }

  checkOtp(otp: string, phone: string) {
    this.registerSteps = 'info';
    sessionStorage.setItem('regStep', this.registerSteps);
    return this.http.post(
      `${environment.apiUrl}/api/sentOTP_and_phone/`,
      {
        phone_number: phone,
        verification_code: otp
      },
      { headers: { Anonymous: 'true' } }
    );
  }

  createUser(payload: { phone: string; full_name: string; password: string }) {
    this.registerSteps;
    return this.http.post(`${environment.apiUrl}/api/userApi/`, payload, {
      headers: { Anonymous: 'true' }
    });
  }

  login(phone: string, password: string) {
    return this.http.post(
      `${environment.apiUrl}/token/`,
      {
        phone,
        password
      },
      { headers: { Anonymous: 'true' } }
    );
  }

  refreshAccessToken() {
    return this.http.post(`${environment.apiUrl}/token/refresh/`, {
      refresh: this.refreshToken
    });
  }

  async setTokensAndPhone(
    tokens: { access: string; refresh: string },
    remembeMe: boolean | null,
    phone: string | null
  ) {
    this.accessToken = tokens.access;
    this.refreshToken = tokens.refresh;

    // * Check tokens place for refresh access token
    if (remembeMe == null) {
      if (this.dataIn === 'local') this.saveTokensToLocalStorage(tokens);
      if (this.dataIn === 'session') this.saveTokensToSessionStorage(tokens);
    } else if (remembeMe) {
      this.saveTokensToLocalStorage(tokens);
      localStorage.setItem('phone', phone);
    } else {
      this.saveTokensToSessionStorage(tokens);
      sessionStorage.setItem('phone', phone);
    }
  }

  initTokens() {
    // * For init register step
    this.registerSteps =
      (sessionStorage.getItem('regStep') as RegSteps) || 'phone';

    if (localStorage.getItem('tokens')) {
      const tokens = JSON.parse(localStorage.getItem('tokens'));
      this.accessToken = tokens.access;
      this.refreshToken = tokens.refresh;
      this.dataIn = 'local';
    }
    if (sessionStorage.getItem('tokens')) {
      const tokens = JSON.parse(sessionStorage.getItem('tokens'));
      this.accessToken = tokens.access;
      this.refreshToken = tokens.refresh;
      this.dataIn = 'session';
    }
  }

  saveTokensToLocalStorage(tokens: { access: string; refresh: string }) {
    this.dataIn = 'local';
    localStorage.setItem('tokens', JSON.stringify(tokens));
  }

  saveTokensToSessionStorage(tokens: { access: string; refresh: string }) {
    this.dataIn = 'session';
    sessionStorage.setItem('tokens', JSON.stringify(tokens));
  }

  getAccessToken(): string {
    return this.accessToken;
  }

  getRefreshToken(): string {
    return this.refreshToken;
  }

  getStep(): RegSteps {
    return this.registerSteps;
  }

  logout() {
    this.accessToken = '';
    this.refreshToken = '';
    localStorage.clear();
    sessionStorage.clear();
    this.router.navigate(['/auth/login']);
  }

  validatePhoneNumber(phone: string) {
    const regex = /^\+998\d{9}$/;
    return regex.test(phone);
  }

  setCurrentUser() {
    const phone =
      localStorage.getItem('phone') || sessionStorage.getItem('phone');
    this.http
      .post(`${environment.apiUrl}/api/userInfo/`, { phone })
      .subscribe((res) => {
        if (this.dataIn === 'local')
          localStorage.setItem('currentUser', JSON.stringify(res));
        if (this.dataIn === 'session')
          sessionStorage.setItem('currentUser', JSON.stringify(res));
      });
  }
}
