import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse, HttpProgressEvent, HttpEventType } from "@angular/common/http";
import { Observable, of, concat } from "rxjs";
import { delay } from "rxjs/operators";

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(
    // private _userService: UserService,
    // private _loginService: LoginService
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.url === 'saveUrl') {
      const events: Observable<HttpEvent<any>>[] = [0, 30, 60, 100].map((x) => of(<HttpProgressEvent>{
        type: HttpEventType.UploadProgress,
        loaded: x,
        total: 100
      }).pipe(delay(200)));

      const success = of(new HttpResponse({ status: 200 })).pipe(delay(200));
      events.push(success);

      return concat(...events);
    }

    if (req.url === 'removeUrl') {
      return of(new HttpResponse({ status: 200 }));
    }

    // if (this._userService.isLogged && this._userService.getToken() != undefined && req.url.startsWith(environment.baseApiUrl)) {
    //   const modified = req.clone({ setHeaders: { 'Authorization': `Bearer ${this._userService.getToken()}` } });
    //   const self = this;

    //   return next.handle(modified).pipe(tap((event: any) => {
    //     if (event instanceof HttpResponse) {
    //       if (event.body && event.body.reason === "Session timed out") {
    //         self._loginService.logout("Session timed out");
    //       }
    //     }
    //   }));
    // }

    return next.handle(req);
  }
}