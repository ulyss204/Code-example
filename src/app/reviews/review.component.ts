import { Component, OnInit, ViewEncapsulation} from '@angular/core';
import { ActivatedRoute, Params,Router} from '@angular/router';
import { AppConfig } from '../app.config';
//import { SearchService } from '../search/search.service';


@Component({
  selector: 'review',
  //templateUrl: './review.template.html',
  //styleUrls: ['./review.style.scss'],
  //encapsulation: ViewEncapsulation.None,
  providers:[
  //  SearchService
  ]

})
export class Review implements OnInit {
  constructor(private route: ActivatedRoute,config: AppConfig,private router: Router,
    //private _searchService: SearchService
  ){
    console.log('hgv');
  }
  ngOnInit(){
    console.log('hgv');
    this.route.queryParams.forEach((params: Params) => {
      console.log(params);
    });
  }
}
