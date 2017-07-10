import { Component, OnInit, ViewEncapsulation} from '@angular/core';
import { ActivatedRoute, Params,Router} from '@angular/router';
import { AppConfig } from '../app.config';
import { SearchService } from '../search/search.service';

declare var jQuery: any;

@Component({
  selector: 'review',
  templateUrl: './review.template.html',
  styleUrls: ['./review.style.scss'],
  encapsulation: ViewEncapsulation.None,
  providers:[
    SearchService
  ]

})
export class Review implements OnInit {
  data:any;
  config:any;
  domain:any;
  unique:any;
  constructor(private route: ActivatedRoute,config: AppConfig,private router: Router,private _searchService: SearchService){
    this.config = config.getConfig();
    this.domain = this.config.baseApiDomain;
  }

  logError(err) {
     console.error('There was an error: ' + err);

  }

  getWines(id,path){

    //this.inputId = jQuery('#eid').val();
    this._searchService.getProfile(this.domain + path + id,'')
    .subscribe(
      data => {
        this.data = data;
      },
      err => this.logError(err),
      // the third argument is a function which runs on completion
      () => {
        console.log(this.data);

      }
    )
  }

  navigate(id,path){
    this.router.navigate(['app/labeling/review', { id: id, url: path }]);
  }

  ngOnInit(){
    this.route.params.subscribe((params: Params) => {
      console.log(params);
      this.unique = params['url'];
      this.getWines(params['id'],params['url']);
    });
  }
}
