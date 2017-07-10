import { Directive, ElementRef } from '@angular/core';
import { AppConfig } from '../app.config';
//import { LogProfileService } from '../login/logProfile.service';

declare var jQuery: any;

@Directive({
  selector: '[geo-locations-widget]'

})

export class GeoLocationsWidget {
  mapData: any;
  config: any;
  $el: any;


  constructor(config: AppConfig, el: ElementRef) {
    this.$el = jQuery(el.nativeElement);
    this.config = config.getConfig();

    };

  mapView() {
    let state;
    this.mapData = {
      areas:{

      },
      legend:{
        area:{
          slices:[{
            min:1,
            max:2,
            attrs:{
              fill:"#012345"
            }
          },{
            min:2,
            max:3,

            attrs:{
              fill:"#abc345"
            }
          }]
        }
      },
      map: {
        name : 'world_countries',
        defaultArea : {
          attrsHover : {
            fill : '#242424',
            animDuration : 100,
            "stroke-width" : 2
          },
          attrs : {
					   stroke : "#fff",
					  "stroke-width" : 1
          },
          tooltip: {
            offset: {
                left: 100,
                top: 100
            }
          }
        },
        defaultPlot: {
          size: 0,
          attrs : {
            //fill : this.config.settings.colors['main-light'],
            stroke : 'transparent',
            'stroke-width' : 0,
            'stroke-linejoin' : 'round'
          },
          attrsHover : {
            'stroke-width' : 1,
            animDuration : 100
          },
          tooltip: {
            offset: {
                left: 100,
                top: 100
            }
          }
        },
        zoom : {
          enabled : true,
          step : 0.75,
          mousewheel: false
        }
      }
  }
}


  logError(err) {
     console.error('There was an error: ' + err);

  }
/*  getMap(id){

    this._logProfileService.getProfile('http://api.wineta.com/v1/wine/statistics/geo?eid=',id)
    .subscribe(
      data => {
        this.geo = data

      },
      err => this.logError(err),
      // the third argument is a function which runs on completion
      () => {
        console.log(this.geo);
        let newPlots = this.geo,
        mapOptions = {'plots' : this.geo},
        deletePlotKeys = 'all';
        this.$el.trigger('update',[mapOptions,newPlots,{animDuration : 600}]);
    })

  }*/

  ngOnInit() {
    this.mapView();
    this.$el.mapael(this.mapData);
  /*  this.router.events
   .filter(event => event instanceof NavigationStart)
   .subscribe((event:NavigationStart) => {

       this.getMap(event.url.match(/\d+/)[0]);

     console.log(event);

     // You only receive NavigationStart events

   });*/

  //  this.getMap(localStorage.getItem('id'));

  }
}
