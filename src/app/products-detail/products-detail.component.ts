import { Component, OnInit, ViewEncapsulation} from '@angular/core';
import { ActivatedRoute, Params} from '@angular/router';
import { AppConfig } from '../app.config';

//import { DetailService } from './products-detail.service';
import { LogProfileService } from '../login/logProfile.service';
declare var jQuery: any;

declare var d3: any;
declare var nv: any;

@Component({
  selector: 'products-detail',
  templateUrl: './products-detail.template.html',
  styleUrls: ['./products-detail.style.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [
    //DetailService,
    LogProfileService
  ]
})
export class DetailComponent implements OnInit {
  config: any;
  domain:any;
  tab: any;
  tabMap:any;
  loading:boolean;
  firstRank: any;
  secondRank:any;
  thirdRank:any;
  arr: Array<any> = [];
  arrData: Array<any> = [];
  vintage:any;
  vintageMonth:any;
  products:any;
  nvd32Chart: any;
  monthChart:any;
  global:any;
  datum: Array<any> = [];
  datumMonth: Array<any> = [];
  globalArr : Array<any> = [];
  geo:any;
  arrayGeo:any;
  dummy:any;
  name:any;

  private productId: string;

  constructor(private route: ActivatedRoute,config: AppConfig, private _logProfileService: LogProfileService) {
    this.config = config.getConfig();

    this.tab = 3;
    this.tabMap = 1;
    this.domain = this.config.baseApiDomain;

  }

  logError(err) {
    //this.loading = false;
    console.error('There was an error: ' + err);

  }
  vintageData(data,url,info){

    this._logProfileService.getProfile(this.domain + 'v1/wine/statistics/'+ url +'?eid=',data)
    .subscribe(
      // the first argument is a function which runs on success
      data => {
        if(info == 1){
          this.vintage = data;
        }
        if(info == 2){
          this.vintageMonth = data;
        }
        this.dummy = info;},
      // the second argument is a function which runs on error
      err => this.logError(err),
      // the third argument is a function which runs on completion
      () => {

        let min = Infinity,
          obj = {
            values:[]
          },
          max = 0;
          function compare(a,b) {
            let d = new Date(),c,e;
            c = new Date(a.month).getTime();
            e = new Date(b.month).getTime();
            return c - e;
          }
          function compareYear(a,b){
            return a.year - b.year;
          }
          if(this.dummy == 1){
            this.datum = []; //empty vintage stats
            this.arr = this.vintage.sort(compareYear);
            for (var _i = 0; _i < this.arr.length; _i++){
               obj.values.push(this.arr[_i]);
               //this.arrData.values.push(this.arr[_i]);
               if(this.arr[_i].rating < min) {
                 min = this.arr[_i].rating;
               }
               if(this.arr[_i].rating > max) {
                 max = this.arr[_i].rating;
               }
            }
            this.nvd32Chart.yDomain([min-1,max+0.5]);
          }else if(this.dummy == 2){
            this.datumMonth = []; //empty vintage stats
            this.arr = this.vintageMonth.sort(compare);
            for (var _i = 0; _i < this.arr.length; _i++){
               obj.values.push(this.arr[_i]);
               //this.arrData.values.push(this.arr[_i]);
               if(this.arr[_i].value < min) {
                 min = this.arr[_i].value;
               }
               if(this.arr[_i].value > max) {
                 max = this.arr[_i].value;
               }
            }
            if(min < 1){
              this.monthChart.yDomain([min,max+30]);
            }else{
              this.monthChart.yDomain([min-15,max+30]);
            }

          }

      this.arrData = [];
      this.arrData.push(obj);
      if(this.dummy == 1){
        this.datum.push(this.arrData);
        this.nvd32Chart.xAxis.showMaxMin(true);
        return this.datum;
      }else if(this.dummy == 2){
        this.datumMonth.push(this.arrData);

     this.monthChart.xAxis.showMaxMin(true);
      /*  .tickFormat(function(d) { return d3.time.format('%H')(new Date(d)); });*/
      /*  var tickvalues = new Array(this.arrData[0].values.length);
        var tickformat = new Array(this.arrData[0].values.length);
        for (var a = 0; a < this.arrData[0].values.length; a++) {
            tickvalues[a] = new Date(this.arrData[0].values[a].month).getTime();
            tickformat[a] = new Date(this.arrData[0].values[a].month).getMonth();
        }

       this.monthChart.xAxis

            .tickFormat(function (d) {
              return tickformat[d];
            });*/
        return this.datumMonth;
      }
    });

  }
  globalData(data){
    this._logProfileService.getProfile(this.domain + 'v1/wine/statistics/global?eid=',data)
    .subscribe(
      // the first argument is a function which runs on success
      data => this.global = data,
      // the second argument is a function which runs on error
      err => this.logError(err),
      // the third argument is a function which runs on completion
      () => {
        //console.log(this.global);
        this.globalArr = []; //empty globall stats
        if(Object.keys(this.global.ranking).length !== 0){
          this.firstRank = (1 - this.global.ranking.world.value/this.global.ranking.world.minimum) * 100;
          this.firstRank = Math.round(this.firstRank);
          this.secondRank = (1 - this.global.ranking.appellation.value/this.global.ranking.appellation.minimum) * 100;
          this.secondRank = Math.round(this.secondRank);
          this.thirdRank = (1 - this.global.ranking.region.value/this.global.ranking.region.minimum) * 100;
          this.thirdRank = Math.round(this.thirdRank);
        }

        this.globalArr.push(this.global);

        setTimeout(()=>{
          this.loading = false;
          if (window.matchMedia("(min-width: 450px)").matches) {
            jQuery('.easy-pie-chart').easyPieChart({
              barColor: '#ccccc5',
              trackColor: '#ddd',
              scaleColor: false,
              lineWidth: 10,
              size: 110
            });
          } else {
            jQuery('.easy-pie-chart').easyPieChart({
              barColor: '#ccccc5',
              trackColor: '#ddd',
              scaleColor: false,
              lineWidth: 10,
              size: 88
            });
          }

          if(Object.keys(this.global.indicator_one).length !== 0){
            jQuery('.easy-pie-chart:eq(0)').data('easyPieChart').update(Math.round(this.global.indicator_one.year.value/this.global.indicator_one.year.maximum*100));
            jQuery('.easy-pie-chart:eq(0)').data('easyPieChart').options.barColor = '#ffc875';
          }
          if(Object.keys(this.global.indicator_two).length !== 0){
            jQuery('.easy-pie-chart:eq(1)').data('easyPieChart').update(Math.round(this.global.indicator_two.year.value/this.global.indicator_two.year.maximum*100));
            jQuery('.easy-pie-chart:eq(1)').data('easyPieChart').options.barColor = '#f55b5b';
          }
          if(Object.keys(this.global.indicator_three).length !== 0){
            jQuery('.easy-pie-chart:eq(2)').data('easyPieChart').options.barColor = '#83d6c0';
            jQuery('.easy-pie-chart:eq(2)').data('easyPieChart').update(Math.round(this.global.indicator_three.year.value/this.global.indicator_three.year.maximum*100));
          }
          jQuery('.easy-pie-chart').data('easyPieChart').enableAnimation();

          if(Object.keys(this.global.ranking).length !== 0){
            jQuery('.easy-pie-chart:eq(3)').data('easyPieChart').update(this.firstRank);
            jQuery('.easy-pie-chart:eq(4)').data('easyPieChart').update(this.secondRank);
            jQuery('.easy-pie-chart:eq(5)').data('easyPieChart').update(this.thirdRank);
          }

        },100);

      });

  }
  geoData(data){
    this._logProfileService.getProfile(this.domain + 'v1/wine/statistics/geo?eid=',data)
    .subscribe(
      // the first argument is a function which runs on success
      data => this.geo = data,
      // the second argument is a function which runs on error
      err => this.logError(err),
      // the third argument is a function which runs on completion
      () => {
        console.log(this.geo);
        let geoStat = this.geo;
      //  this.loading = false;

        this.colorCircle(geoStat,this.tabMap);
      });
    }
    colorCircle(geo,switchItem) {
      let color,
      objR = {},
      arrayR = [],

      arrayGeo,
      r,g,b,minR = Infinity,maxR = 0;
      arrayGeo = $.map(geo, function(value, index) {
        return [value];
      });
      console.log(arrayGeo);
      const rgbToHex = (a, b, c) => '#' + [a, b, c].map(x => {
        const hex = x.toString(16);
        return hex.length === 1 ? '0' + hex : hex;
      }).join('');
      for (var _i = 0; _i < arrayGeo.length; _i++){
        //console.log(arrayGeo[_i].datar);

          if(switchItem == 3){
            if(arrayGeo.length < 2){
              minR = 0;
              maxR = arrayGeo[_i].rating;
            }else{
              if(arrayGeo[_i].rating < minR) {
                minR = arrayGeo[_i].rating;
              }
              if(arrayGeo[_i].rating > maxR) {
                maxR = arrayGeo[_i].rating;
              }
            }
          }else if(switchItem == 2) {
            if(arrayGeo.length < 2){
              minR = 0;
              maxR = arrayGeo[_i].size;
            }else{
              if(arrayGeo[_i].size < minR) {
                minR = arrayGeo[_i].size;
              }
              if(arrayGeo[_i].size > maxR) {
                maxR = arrayGeo[_i].size;
              }
            }
          }else if(switchItem == 1)
            if(arrayGeo.length < 2){
              minR = 0;
              maxR = arrayGeo[_i].index;
            }else{
              if(arrayGeo[_i].index < minR) {
                minR = arrayGeo[_i].index;
              }
              if(arrayGeo[_i].index > maxR) {
                maxR = arrayGeo[_i].index;
              }
            }
          }
      for (var _i = 0; _i < arrayGeo.length; _i++){
        if(switchItem == 3){
          arrayGeo[_i].value = arrayGeo[_i].rating *1000;
        }else if(switchItem == 2){
          arrayGeo[_i].value = arrayGeo[_i].size *1000;
        }else if(switchItem == 1){
          arrayGeo[_i].value = arrayGeo[_i].index *1000;
        }

      /*  delete arrayGeo[_i].latitude;
        delete arrayGeo[_i].longitude;*/
        arrayGeo[_i].tooltip = {};
        arrayGeo[_i].tooltip.content = `<h5 class='text-xs-center fw-bold tooltip-title'>
        <span class='glyphicon glyphicon-map-marker '></span><span >`+ arrayGeo[_i].name + `</span></h5>
        <div class='row'><div class='col-md-5 col-md-offset-1 width pos'><p class='fw-semi-bold tooltip-font'>Average rating:<span>`+ arrayGeo[_i].rating.toFixed(1) +`</span>/10</p>
        <p class='fw-semi-bold tooltip-font'>Weighted popularity:`+ arrayGeo[_i].size +`</p></div>
        <div class='col-md-5 col-md-offset-1 width' >
        <p class=' fw-semi-bold tooltip-font'>Rating by gender</p>
        <div class="row" style="margin-left:0px">
        <progress class="progress-color progress progress progress-warning " value="10" max="10" style="width: `+ arrayGeo[_i].gender_ratings.female*10+`%"></progress>
        <span class="fw-semi-bold">M</span>
        </div>
        <div class="row" style="margin-left:0px">
        <progress class="progress-color progress progress progress-warning " value="10" max="10" style="width: `+ arrayGeo[_i].gender_ratings.male*10+`%"></progress>
        <span class="fw-semi-bold">F</span>
        </div>

        </div></div>`;
        //delete arrayGeo[_i].rating;
        r = Math.floor((arrayGeo[_i].value/1000) * ((254 - 218) /(minR - maxR)) + (minR * 218 - 254 * maxR)/(minR - maxR));
        g = Math.floor((arrayGeo[_i].value/1000) * ((199 - 33) /(minR - maxR)) + (minR * 33 - 199 * maxR)/(minR - maxR));
        b = Math.floor((arrayGeo[_i].value/1000) * ((123 - 51) /(minR - maxR)) + (minR * 51 - 123 * maxR)/(minR - maxR));

        color = rgbToHex(r,g,b);
        objR = {
          "min": arrayGeo[_i].value ,
          "max": arrayGeo[_i].value  + 1,
          "attrs": {
              "fill": color
          }
        }
        arrayR.push(objR);

      }
      geo = arrayGeo.reduce(function (o, currentArray) {
        let key = currentArray.geo, value = currentArray;
        o[key] = value;
        return o;
      }, {});
      let
      mapOptions = {};
      mapOptions = {
        'legend':{
          'area':{
            'slices':arrayR
          }
        },
        'areas' : geo
      };
      setTimeout(()=>{
        jQuery('.mapael').trigger('update',[mapOptions,{animDuration : 950}]);
        console.log(mapOptions);

      },250);
    }
  rating(){
    this.tabMap = 3;
    jQuery('.switcher li ').removeClass('underline');
    jQuery('.switcher li:eq(2)').addClass('underline');
    this.colorCircle(this.geo,3);
  }
  popularity(){
    this.tabMap = 2;
    jQuery('.switcher li ').removeClass('underline');
    jQuery('.switcher li:eq(1)').addClass('underline');
    this.colorCircle(this.geo,2);
  }
  composite(){
    this.tabMap = 1;
    jQuery('.switcher li ').removeClass('underline');
    jQuery('.switcher li:eq(0)').addClass('underline');
    this.colorCircle(this.geo,1);
  }
  isSetTab(checkTab) {
     return this.tab === checkTab;
  }
  week(activeTab) {
    jQuery('.pull-right li ').removeClass('underline');
    jQuery('.pull-right li:eq(0)').addClass('underline');
    this.tab = activeTab;
    setTimeout(()=>{
      if (window.matchMedia("(min-width: 450px)").matches) {
        jQuery('.easy-pie-chart').easyPieChart({
          barColor: '#ccccc5',
          trackColor: '#ddd',
          scaleColor: false,
          lineWidth: 10,
          size: 110
        });
      } else {
        jQuery('.easy-pie-chart').easyPieChart({
          barColor: '#ccccc5',
          trackColor: '#ddd',
          scaleColor: false,
          lineWidth: 10,
          size: 88
        });
      }
      jQuery('.easy-pie-chart:eq(0)').data('easyPieChart').options.barColor = '#ffc875';
      jQuery('.easy-pie-chart:eq(1)').data('easyPieChart').options.barColor = '#f55b5b';
      jQuery('.easy-pie-chart:eq(2)').data('easyPieChart').options.barColor = '#83d4be';

      jQuery('.easy-pie-chart:eq(0)').data('easyPieChart').update(Math.round(this.global.indicator_one.week.value/this.global.indicator_one.week.maximum*100));
      jQuery('.easy-pie-chart:eq(1)').data('easyPieChart').update(Math.round(this.global.indicator_two.week.value/this.global.indicator_two.week.maximum*100));
    jQuery('.easy-pie-chart:eq(2)').data('easyPieChart').update(Math.round(this.global.indicator_three.week.value/this.global.indicator_three.week.maximum*100));

  },0)
  }

  month(activeTab) {
    jQuery('.pull-right li ').removeClass('underline');
    jQuery('.pull-right li:eq(1)').addClass('underline');
    this.tab = activeTab;
    setTimeout(()=>{
      if (window.matchMedia("(min-width: 450px)").matches) {
        jQuery('.easy-pie-chart').easyPieChart({
          barColor: '#ccccc5',
          trackColor: '#ddd',
          scaleColor: false,
          lineWidth: 10,
          size: 110
        });
      } else {
        jQuery('.easy-pie-chart').easyPieChart({
          barColor: '#ccccc5',
          trackColor: '#ddd',
          scaleColor: false,
          lineWidth: 10,
          size: 88
        });
      }
      jQuery('.easy-pie-chart:eq(0)').data('easyPieChart').options.barColor = '#ffc875';
      jQuery('.easy-pie-chart:eq(1)').data('easyPieChart').options.barColor = '#f55b5b';
      jQuery('.easy-pie-chart:eq(2)').data('easyPieChart').options.barColor = '#83d4be';

    jQuery('.easy-pie-chart:eq(0)').data('easyPieChart').update(Math.round(this.global.indicator_one.month.value/this.global.indicator_one.month.maximum*100));
    jQuery('.easy-pie-chart:eq(1)').data('easyPieChart').update(Math.round(this.global.indicator_two.month.value/this.global.indicator_two.month.maximum*100));
    jQuery('.easy-pie-chart:eq(2)').data('easyPieChart').update(Math.round(this.global.indicator_three.month.value/this.global.indicator_three.month.maximum*100));

  },0)

  }

  year(activeTab) {
    jQuery('.pull-right li ').removeClass('underline');
    jQuery('.pull-right li:eq(2)').addClass('underline');
    this.tab = activeTab;
    setTimeout(()=>{
      if (window.matchMedia("(min-width: 450px)").matches) {
        jQuery('.easy-pie-chart').easyPieChart({
          barColor: '#ccccc5',
          trackColor: '#ddd',
          scaleColor: false,
          lineWidth: 10,
          size: 110
        });
      } else {
        jQuery('.easy-pie-chart').easyPieChart({
          barColor: '#ccccc5',
          trackColor: '#ddd',
          scaleColor: false,
          lineWidth: 10,
          size: 88
        });
      }
      jQuery('.easy-pie-chart:eq(0)').data('easyPieChart').options.barColor = '#ffc875';
      jQuery('.easy-pie-chart:eq(1)').data('easyPieChart').options.barColor = '#f55b5b';
      jQuery('.easy-pie-chart:eq(2)').data('easyPieChart').options.barColor = '#83d4be';

      jQuery('.easy-pie-chart:eq(0)').data('easyPieChart').update(Math.round(this.global.indicator_one.year.value/this.global.indicator_one.year.maximum*100));
    jQuery('.easy-pie-chart:eq(1)').data('easyPieChart').update(Math.round(this.global.indicator_two.year.value/this.global.indicator_two.year.maximum*100));
    jQuery('.easy-pie-chart:eq(2)').data('easyPieChart').update(Math.round(this.global.indicator_three.year.value/this.global.indicator_three.year.maximum*100));

  },0)

  }

  histogram () {
    this.nvd32Chart = nv.models.multiBarChart()
      .margin({left: 0, bottom: 0, right: 0,top:0})
      .barColor([this.config.settings.colors['main-light']])
      .showYAxis(false)

      .duration(500);
      this.nvd32Chart.groupSpacing(0.01)
                      .showControls(false)
                      .reduceXTicks(true)

                      .height(200);

     d3.select("#chart svg g.nv-series-0").style("fill-opacity", 1);
     //d3.select("#chartMonth svg g.nv-series-0").style("fill-opacity", 1);
      this.nvd32Chart.x(function(d) { return d.year; });
      this.nvd32Chart.y(function(d) { return d.rating; });
      this.nvd32Chart.showLegend(false);
    nv.utils.windowResize(this.nvd32Chart.update);
  }

  histogramMonth(){
    this.monthChart = nv.models.multiBarChart()
      .margin({left: 15, bottom: 0, right: 15,top:0})
      .barColor([this.config.settings.colors['main-light']])
      .showYAxis(false)

      .duration(500);
      this.monthChart.groupSpacing(0.01)
                      .showControls(false)
                      .reduceXTicks(true)

                      .height(200);

     //d3.select("#chart svg g.nv-series-0").style("fill-opacity", 1);
     d3.select("#chartMonth svg g.nv-series-0").style("fill-opacity", 1);
      this.monthChart.x(function(d) { return d.month; });
      this.monthChart.y(function(d) { return d.value; });
      this.monthChart.showLegend(false);

    nv.utils.windowResize(this.monthChart.update);
  }

  ngAfterViewInit() {
    this.route.params.forEach((params: Params) => {
      this.loading = true;
      console.log(params);
      this.productId = params['id'];
      this.globalData(this.productId);
      this.geoData(this.productId);
      this.vintageData(this.productId,'vintage',1);
      this.vintageData(this.productId,'frequency',2);
      for(let item of this.products){
        //console.log(item.entity.eid);
        if(item.entity.eid == this.productId){
          this.name = item;
          console.log(this.name);
        }
      }
  });
    localStorage.setItem('id',this.productId);


    /*this.histogram();
    this.globalStat(this.productId);

    this.router.events
   .filter(event => event instanceof NavigationStart)
   .subscribe((event:NavigationStart) => {

     //this.applyNvd3Data(this.productId);
     setTimeout(()=>{
     this.globalStat(this.productId);
     console.log(event);
   },0)
     // You only receive NavigationStart events

   });*/
  }
  ngOnInit() {
    this.histogram();
    this.histogramMonth();
    this.products = JSON.parse(localStorage.getItem('product'));
    console.log(this.products);
  }
}
