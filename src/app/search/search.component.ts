import { Component, OnInit, ViewEncapsulation} from '@angular/core';
import { ActivatedRoute, Params,Router} from '@angular/router';
import { AppConfig } from '../app.config';
import { SearchService } from './search.service';

//declare var jQuery: any;

@Component({
  selector: 'search-wine',
  templateUrl: './search.template.html',
  styleUrls: ['./search.style.scss'],
  encapsulation: ViewEncapsulation.None,
  providers:[
    SearchService
  ]

})
export class SearchComponent implements OnInit {
  data:any;
  config: any;
  domain:any;
  title:string;
  wine:string;
  original_id:string;
  wine_type:string;
  varietal:string;
  country_tid:string;

  constructor(config: AppConfig,private router:Router,private _searchService: SearchService){
    this.config = config.getConfig();
    this.domain = this.config.baseApiDomain;
    this.title='';
    this.wine ='';
    this.original_id='';
    this.wine_type='';
    this.varietal = '';
    this.country_tid='';
  }

  logError(err) {
     console.error('There was an error: ' + err);

  }

  getWines(){
    if(this.country_tid != ''){
      this.country_tid = '&country_tid='+ this.country_tid;
    }
    //this.inputId = jQuery('#eid').val();
    this._searchService.getProfile(this.domain+'wine/all/search?title='+ this.title +'&wine='+ this.wine +'&original_id='+ this.original_id +'&wine_type='+ this.wine_type + '&varietal=' + this.varietal + this.country_tid,'')
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

  ngOnInit() {
    console.log('sdfsdf');
  /*  let $table = $('table'),
    $bodyCells = $table.find('tbody tr:first').children(),
    colWidth;
    $(window).resize(function() {
    // Get the tbody columns width array
      colWidth = $bodyCells.map(function() {
          return $(this).width();
      }).get();

      // Set the width of thead columns
      $table.find('thead tr').children().each(function(i, v) {
          $(v).width(colWidth[i]);
      });
    }).resize();*/
  }
}
