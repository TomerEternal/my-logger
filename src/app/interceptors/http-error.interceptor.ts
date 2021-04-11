import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TakeawayLoggerService } from 'projects/takeaway-logger/src/public-api';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
  constructor(private readonly takeawayLogger: TakeawayLoggerService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMsg = '';
        if (error.error instanceof ErrorEvent) {
          errorMsg = `Error: ${error.error.message}`;
        } else {
          errorMsg = `Error Code: ${error.status},  Message: ${error.message}`;
        }

        this.takeawayLogger.writeError(
          errorMsg,
        );
        return throwError(errorMsg);
      })
    );
  }
}
