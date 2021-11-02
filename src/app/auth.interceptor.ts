import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler } from "@angular/common/http";
import { AuthenticationService } from "./service/authentication.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private authService: AuthenticationService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        const accessToken = this.authService.getAccessToken();
        req = req.clone({
            setHeaders: {
                Authorization:"Bearer " + accessToken
            }
        });
        return next.handle(req);
    }
}