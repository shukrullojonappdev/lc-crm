import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, finalize, tap } from 'rxjs';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService, private router: Router) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const accessToken = this.authService.getAccessToken();

    if (request.headers.get('Anonymous')) {
      const newHeaders = request.headers.delete('Anonymous');
      const newRequest = request.clone({
        headers: newHeaders,
        setHeaders: {
          Authorization: 'Bearer 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'
        }
      });
      return next.handle(newRequest);
    } else {
      const newReq = request.clone({
        setHeaders: {
          Authorization: `Bearer ${accessToken}`
        }
      });

      return next.handle(newReq).pipe(
        tap({
          next: (_e) => {},
          error: (err) => {
            if (err.status === 403) {
              this.authService.refreshAccessToken().subscribe(
                (res: any) => {
                  const refresh = this.authService.getRefreshToken();
                  const access = res.access;

                  this.authService
                    .setTokens({ access, refresh }, null)
                    .then((_res) => {
                      // * Refresh page after token refreshed
                      const currentUrl = this.router.url;
                      this.router
                        .navigateByUrl('/', {
                          skipLocationChange: true
                        })
                        .then(() => {
                          this.router.navigate([currentUrl]);
                        });
                    });
                },
                (_err) => {
                  this.authService.logout();
                  this.router
                    .navigateByUrl('/', {
                      skipLocationChange: true
                    })
                    .then(() => {
                      this.router.navigate(['/auth/login']);
                    });
                }
              );
            }
          }
        }),
        finalize(() => {})
      );
    }
  }
}
