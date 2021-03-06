import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import { delay, finalize } from 'rxjs/Operators';

import { BusyService } from '../services/busy.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {

  constructor(private busyService: BusyService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if(!request.url.includes('emailexists')){
      this.busyService.busy();
    }

    return next.handle(request).pipe(
      delay(1000),
      finalize(()=>{
        this.busyService.idle();
      })
    )
  }
}
