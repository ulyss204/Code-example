import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';

import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';


@Injectable()
export class DetailService {
  org:any;
  constructor(private http: Http) { }

  getDetails(url1,url2,url3,id) {
    this.org = JSON.parse(localStorage.getItem('id_token1'));

    let headers = new Headers();
    headers.append("X-Auth-Token",this.org.access_token);
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');
    let options = new RequestOptions({ headers: headers });

    //let options = new
    return Observable.onErrorResumeNext(
      this.http.get(url1 +id,options).map((res:Response) => res.json()),
      this.http.get(url2 +id,options).map((res:Response) => res.json()),
      this.http.get(url3 +id,options).map((res:Response) => res.json())
    );
  }

}
