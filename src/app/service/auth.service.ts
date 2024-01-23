import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

type RegSteps = 'phone' | 'otp' | 'info';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  refreshToken: string = '';
  accessToken: string = '';
  registerSteps: RegSteps = 'phone';
  tokensIn: 'local' | 'session' | null = null;

  constructor(private http: HttpClient) {}

  sendOtp(phone: string) {
    const tempPhone = phone.replaceAll('-', '');
    this.registerSteps = 'otp';
    sessionStorage.setItem('regStep', this.registerSteps);
    return this.http.post(`${environment.apiUrl}/api/sentOTP/`, {
      phone_number: tempPhone
    });
  }

  checkOtp(otp: string, phone: string) {
    this.registerSteps = 'info';
    sessionStorage.setItem('regStep', this.registerSteps);
    return this.http.post(`${environment.apiUrl}/api/sentOTP_and_phone/`, {
      phone_number: phone,
      verification_code: otp
    });
  }

  createUser(payload: { phone: string; full_name: string; password: string }) {
    this.registerSteps;
    return this.http.post(`${environment.apiUrl}/api/userApi/`, payload);
  }

  login(phone: string, password: string) {
    return this.http.post(`${environment.apiUrl}/token/`, {
      phone,
      password
    });
  }

  refreshAccessToken() {
    return this.http.post(`${environment.apiUrl}/token/refresh/`, {
      refresh: this.refreshToken
    });
  }

  async setTokens(
    tokens: { access: string; refresh: string },
    remembeMe: boolean | null
  ) {
    this.accessToken = tokens.access;
    this.refreshToken = tokens.refresh;

    // * Check tokens place for refresh access token
    if (remembeMe == null) {
      if (this.tokensIn === 'local') this.saveTokensToLocalStorage(tokens);
      if (this.tokensIn === 'session') this.saveTokensToSessionStorage(tokens);
    } else if (remembeMe) {
      this.saveTokensToLocalStorage(tokens);
    } else {
      this.saveTokensToSessionStorage(tokens);
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
      this.tokensIn = 'local';
    }
    if (sessionStorage.getItem('tokens')) {
      const tokens = JSON.parse(sessionStorage.getItem('tokens'));
      this.accessToken = tokens.access;
      this.refreshToken = tokens.refresh;
      this.tokensIn = 'session';
    }
  }

  saveTokensToLocalStorage(tokens: { access: string; refresh: string }) {
    this.tokensIn = 'local';
    localStorage.setItem('tokens', JSON.stringify(tokens));
  }

  saveTokensToSessionStorage(tokens: { access: string; refresh: string }) {
    this.tokensIn = 'session';
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
  }

  validatePhoneNumber(phone: string) {
    const regex = /^\+998\d{9}$/;
    return regex.test(phone);
  }
}
