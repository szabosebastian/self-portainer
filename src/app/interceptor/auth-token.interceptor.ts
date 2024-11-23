import { HttpInterceptorFn } from '@angular/common/http';
import { environment } from "../../environments/environment";

export const authTokenInterceptor: HttpInterceptorFn = (req, next) => {
  let authReq = req;

  const token = environment.API_KEY;

  if (token != null) {
    authReq = req.clone({
      headers: req.headers.set("X-API-Key", token),
    });
  }

  return next(authReq);
};
