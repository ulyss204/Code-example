import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';


import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class LoginService {
  org:any;
  constructor(private http:Http) { }

  getWines(url,id) {
    this.org = JSON.parse(localStorage.getItem('id_token1'));

    let headers = new Headers();
    headers.append("X-Auth-Token",this.org.access_token);
    headers.append('Content-Type', 'application/json');

    headers.append('Accept', 'application/json');




    let options = new RequestOptions({ headers: headers });

    //let options = new
    return this.http.get(url + id,options).map((res:Response) => res.json().managed_products);
  }
}
