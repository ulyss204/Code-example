import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CanActivate } from '@angular/router';
import { Http, Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
// Import our authentication service


@Injectable()
export class AuthGuard implements CanActivate {
  org:any;
  constructor(private router: Router, public http: Http) { }

  canActivate() {
    console.log(localStorage.getItem('id_token1'));
    // If user is not logged in we'll send them to the homepage
    if (!localStorage.getItem('id_token1')) {

      this.router.navigate(['/login']);
      return false;
    }

    return true;
  }
}
