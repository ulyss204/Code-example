import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';

import 'rxjs/add/operator/map';

@Injectable()
export class LinkingService {
  org:any;
  constructor(private http: Http) { }

  getDetails(url,id,arr) {
    this.org = JSON.parse(localStorage.getItem('id_token1'));

    let headers = new Headers();
    headers.append("X-Auth-Token",this.org.access_token);
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');
    let options = new RequestOptions({ headers: headers });

    //let options = new
    return  this.http.post(url +id,arr,options).map((res:Response) => res.json());

  }
}
