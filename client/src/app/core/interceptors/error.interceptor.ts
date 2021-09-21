import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, delay } from 'rxjs/Operators';

import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private router: Router,private toastr:ToastrService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(

      catchError(error =>{
        if(error){
          if(error.status == 400){
              this.toastr.error(error.error.message,error.error.statuscode);

          }

          if(error.status === 404){
            this.toastr.error(error.error.message,error.error.statuscode);
            //this.router.navigateByUrl('/not-found');.....if i have created this component
          }
          else if(error.status === 500){
            this.toastr.error(error.error.message,error.error.statuscode);
            // this.router.navigateByUrl('/server-error');.....if i have created this component
          }

        }
        return throwError(error);

      })
    );
  }
}
