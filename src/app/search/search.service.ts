import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';

@Injectable()
export class SearchService {
  org:any;
  options:any;
  constructor(private http:Http) {
    this.org = JSON.parse(localStorage.getItem('id_token1'));
    let headers = new Headers();
    headers.append("X-Auth-Token",this.org.access_token);
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');
    this.options = new RequestOptions({ headers: headers });
  }

  getProfile(url,id) {

    //let options = new
    return this.http.get(url + id,this.options).map((res:Response) => res.json());
  }
}
