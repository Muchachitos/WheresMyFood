import { HttpInterceptor, HttpHandler, HttpHeaderResponse, HttpSentEvent, HttpProgressEvent, HttpResponse, HttpUserEvent, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { AppConfig } from '../../app.config';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private authService: AuthService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpSentEvent | HttpHeaderResponse | HttpProgressEvent | HttpResponse<any> | HttpUserEvent<any>> {
        req.headers.append('Authorization', `Bearer ${this.authService.getToken()}`);
        req.headers.append('Access-Control-Allow-Origin', AppConfig.clientUrl);
        req.headers.append('Access-Control-Allow-Credentials', 'true');
        return next.handle(req);
    }
}