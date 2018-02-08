import { HttpInterceptor, HttpHandler, HttpHeaderResponse, HttpSentEvent, HttpProgressEvent, HttpResponse, HttpUserEvent, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../../auth/auth.service';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private authService: AuthService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpSentEvent | HttpHeaderResponse | HttpProgressEvent | HttpResponse<any> | HttpUserEvent<any>> {
        req.headers.append('Authorization', `Bearer ${this.authService.getToken()}`);
        req.headers.append('Access-Control-Allow-Origin', 'http://localhost:4200');
        req.headers.append('Access-Control-Allow-Credentials', 'true');
        return next.handle(req);
    }
}