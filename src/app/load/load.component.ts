import { Component, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { AppConfig } from '../app.config';
//import { Http, Response } from '@angular/http';
import { LoginService } from '../login/login.service';
import { LogProfileService } from '../login/logProfile.service';

@Component({
  selector: 'load',
  styleUrls: [ './load.style.scss' ],
  templateUrl: './load.template.html',
  encapsulation: ViewEncapsulation.None,
  providers:[
    LogProfileService,
    LoginService
  ]
})

export class Load {
  config: any;
  domain:any;
  products:Object;
  profile:any;
  arr:any;
  id:any;
  role: any;

  constructor(public router: Router,config: AppConfig,private _loginService: LoginService,private _logProfileService: LogProfileService) {
    this.config = config.getConfig();

    this.domain = this.config.baseApiDomain;
  }

  getWines(id) {
    this._loginService.getWines(this.domain + 'v1/admin/organization?id=',id)

    .subscribe(
      // the first argument is a function which runs on success
      data => this.products = data,
      // the second argument is a function which runs on error
      err => this.logError(err),
      // the third argument is a function which runs on completion
      () => {


        localStorage.setItem('product',JSON.stringify(this.products));



        console.log(JSON.parse(localStorage.getItem('product')));
        this.router.navigate(['app']);
        //this.loading = false;
      }
    );
  }

  getProfile(){
    this._logProfileService.getProfile(this.domain + 'v1/admin/user/profile','')

    .subscribe(
      // the first argument is a function which runs on success
      data => this.profile = data,
      // the second argument is a function which runs on error
      err => this.logError(err),
      // the third argument is a function which runs on completion
      () => {
        delete this.profile.organization.managed_products;
        localStorage.setItem('profile',JSON.stringify(this.profile));
        console.log(JSON.parse(localStorage.getItem('profile')));
        this.role = JSON.parse(localStorage.getItem('profile')).role.id;
        this.getWines(JSON.parse(localStorage.getItem('profile')).organization.id);
      }

    );
  }

  logError(err) {
     console.error('There was an error: ' + err);
  }

  ngOnInit():void {
    this.getProfile();
  }
}
