import { Component, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { Http, Response } from '@angular/http';
import 'messenger/build/js/messenger.js';
import { MessengerDemo } from '../ui-elements/notifications/messenger/messenger.directive';
import { contentHeaders } from '../common/headers';
import { AppConfig } from '../app.config';
declare var Messenger: any;


// Import RxJs required methods
import 'rxjs/add/operator/map';


@Component({
  selector: 'login',
  styleUrls: [ './login.style.scss' ],
  templateUrl: './login.template.html',
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'login-page app'
  },
  providers: [
    MessengerDemo
  ]
})

export class Login {
  config: any;
  domain:any;
  products:Object;
  profile:any;
  loading:boolean;
  arr:any;
  id:any;
  role: any;

  constructor( public router: Router, public http: Http,private _messenger: MessengerDemo,config: AppConfig){
    localStorage.removeItem('id_token1');
    localStorage.removeItem('profile');
    localStorage.removeItem('product');
    this.loading = false;
    this.config = config.getConfig();
    this.domain = this.config.baseApiDomain;

  };


  logError(err) {
    console.error('There was an error: ' + err);
    this.loading = false;
     this._messenger.render(err);
  /*  let i = 0,
        message;
    err ='' + err;

    if(err.indexOf('401') != -1){
      Messenger().post({
        message: 'Geoffrey,he wrote username or password wrong again.Maybe we should smash his face in?',

        type: 'error',
        showCloseButton: true
      });

        return false;
  } */
    /* if(err.indexOf('500') != -1){
      Messenger().run({
        errorMessage: "Problem with server.That's life,dude.We try to fix it",
        successMessage: 'At least we tried (:',
        action: function(opts): any {
          if (++i < 3) {
            return opts.error({
              status: 500,
              readyState: 0,
              responseText: 0
            });
          } else {
            return opts.success();
          }
        }
      });
        return false;
    }*/


  }



  login(event, username, password)  {
    event.preventDefault();
        this.loading = true;
        //localStorage.setItem('loading',this.loading);
         // ...using post request
        this.http.post(this.domain + 'oauth/access_token?grant_type=password&client_id=test_client_id&client_secret=test_client_secret&username='+username+'&password='+ password +'',{ headers: contentHeaders })
                        // ...and calling .json() on the response to return data
                        .map(res => res.text())
                        .subscribe(
            //get data to localStorage
          data => localStorage.setItem('id_token1',data) ,
          err => this.logError(err) ,
          () => {
            console.log(localStorage.getItem('id_token1'));
            this.loading = false;
            this.router.navigate(['load']);

          }

      );
      //move to dashboard

     }


  signup(event) {
    event.preventDefault();
    this.router.navigateByUrl('/login');
  }

}
