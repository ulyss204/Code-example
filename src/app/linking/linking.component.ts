import { Component, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Params ,Router} from '@angular/router';
import { LogProfileService } from '../login/logProfile.service';
import { LinkingService } from './linking.service'
import { AppConfig } from '../app.config';


declare var jQuery: any;

@Component({
  selector: 'linking',
  styleUrls: [ './linking.style.scss' ],
  templateUrl: './linking.template.html',
  encapsulation: ViewEncapsulation.None,

  providers:[
    LogProfileService,
    LinkingService
  ]
})

export class Linking {
  data:any;
  config: any;
  domain:any;
  wines:any;
  linked:any;
  checkedWine:any;
  links:Array<any> = [];
  wineEid:any;
  inputId:any;

  constructor(private route: ActivatedRoute,config: AppConfig,private router: Router,private _logProfileService: LogProfileService,private _linkingService:LinkingService){
    this.config = config.getConfig();
    this.domain = this.config.baseApiDomain;
  }

  logError(err) {
     console.error('There was an error: ' + err);

  }


  sendId(id){
    //this.inputId = jQuery('#eid').val();
    this._logProfileService.getProfile(this.domain+'v1/admin/label/getwines?unique_wine='+ id ,'')
    .subscribe(
      data => {
        this.data = data;
      },
      err => this.logError(err),
      // the third argument is a function which runs on completion
      () => {
        console.log(this.data);
        this.wines = this.data.potential_linked_wines;
        this.linked = this.data.unique_wine_reference.linked_wine_references;
        for(let i of this.linked){
          this.links.push(i.wineid);
        }
      }
    )
  }
  sendResult() {
    let checked = [];
    jQuery('input:checked').each(function () {
       let sThisVal =  jQuery(this).val();
       console.log(sThisVal);
       checked.push(sThisVal);
  });
    this.checkedWine = checked;
    this._linkingService.getDetails(this.domain+'v1/admin/label/postwines?unique_wine='+this.data.unique_wine_reference.eid,'',this.checkedWine).subscribe(
      err => this.logError(err),
      // the third argument is a function which runs on completion
      () => {
        console.log('awesome');

        }

    );


  }
  ngOnInit(){
    this.route.params.subscribe((params: Params) => {

     //this.applyNvd3Data(this.productId);

     this.sendId(params['id']);
     console.log(params);
     // You only receive NavigationStart events

   });

    this.route.params.forEach((params: Params) => this.wineEid = params['id']);
    this.sendId(this.wineEid);
  }
}
