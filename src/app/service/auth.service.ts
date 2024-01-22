import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  refreshToken: string = '';
  accessToken: string = '';

  constructor(private http: HttpClient) { }

  sendOtp(phone: string) {
    const tempPhone = phone.replaceAll('-', '');
    return this.http.post(`${environment.apiUrl}/api/sentOTP/`, {
      phone_number: tempPhone
    });
  }

  checkOtp(otp: string, phone: string) {
    return this.http.post(`${environment.apiUrl}/api/sentOTP_and_phone/`, {
      phone_number: phone,
      verification_code: otp
    });
  }

  createUser(payload: { phone: string; full_name: string; password: string }) {
    return this.http.post(`${environment.apiUrl}/api/userApi/`, payload);
  }

  login(phone: string, password: string) {
    return this.http.post(`${environment.apiUrl}/token/`, {
      phone,
      password
    });
  }

  async setTokens(
    tokens: { access: string; refresh: string },
    remembeMe: boolean
  ) {
    this.accessToken = tokens.access;
    this.refreshToken = tokens.refresh;

    if (remembeMe) {
      this.saveTokensToLocalStorage(tokens);
    } else {
      this.saveTokensToSessionStorage(tokens);
    }
  }

  initTokens() {
    if (localStorage.getItem('tokens')) {
      const tokens = JSON.parse(localStorage.getItem('tokens'));
      this.accessToken = tokens.access;
      this.refreshToken = tokens.refresh;
    }
    if (sessionStorage.getItem('tokens')) {
      const tokens = JSON.parse(sessionStorage.getItem('tokens'));
      this.accessToken = tokens.access;
      this.refreshToken = tokens.refresh;
    }
  }

  saveTokensToLocalStorage(tokens: { access: string; refresh: string }) {
    localStorage.setItem('tokens', JSON.stringify(tokens));
  }

  saveTokensToSessionStorage(tokens: { access: string; refresh: string }) {
    sessionStorage.setItem('tokens', JSON.stringify(tokens));
  }

  getAccessToken(): string {
    return this.accessToken
  }

  getRefreshToken(): string {
    return this.refreshToken
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
