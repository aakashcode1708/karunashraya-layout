import { Injectable } from '@angular/core';
import {Auth, auths} from '../model/auth';
import {Role} from '../model/role';

import { Observable, of, Subscription } from 'rxjs';
import { map, filter, scan, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor() { }

  public doLogin(auth:Auth) {
    return of(auths).pipe(
      map(x=>{
        return x;
      }),
      map(x=>{
        return x.filter(xx=>{
          if (xx.id===auth.id){
            return true;
          } else {
            return false;
          }
        })
      })
    );
  }

}
