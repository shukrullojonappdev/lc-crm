import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, finalize, tap } from 'rxjs';
import { AuthService } from '../service/auth.service';
import { ActivatedRoute } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService, private route: ActivatedRoute) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const accessToken = this.authService.getAccessToken()
    const refreshToken = this.authService.getRefreshToken()

    const newReq = request.clone({
      setHeaders: {
        Authorization: `Bearer ${accessToken}`
      }
    }
    )

    return next.handle(newReq).pipe(
      tap({
        next: (e) => {
          console.log(e, 'next');
          console.log(this.route.url);
        },
        error: (err) => {
          console.log(err, 'error');

        }
      }
      ),
      finalize(() => {
        console.log('finalize');

      })
    )
  }
}
