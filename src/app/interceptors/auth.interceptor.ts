import { HttpHandlerFn, HttpRequest } from "@angular/common/http";
import { LOCALSTORAGE_KEYS } from "../common/constants";

export function authInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn) {
  const token = localStorage.getItem(LOCALSTORAGE_KEYS.TOKEN);
  const newRequest = req.clone({
    headers: req.headers.append('Authorization', `Bearer ${token}`)
  })

  return next(newRequest);
}
