import { NgModule } from '@angular/core';
import { CommonModule }  from '@angular/common';
import { RouterModule } from '@angular/router';
//import 'jquery.animate-number/jquery.animateNumber.js';
import 'easy-pie-chart/dist/jquery.easypiechart.js';

import 'jQuery-Mapael/js/jquery.mapael.js';
import 'jQuery-Mapael/js/maps/world_countries';
import { DetailComponent } from './products-detail.component';
//import { WidgetModule } from '../layout/widget/widget.module';
import { AnimateNumber } from '../layout/utils/directives/animate-number.directive';

//import { LogProfileService } from '../login/logProfile.service';
import { Nvd3ChartModule } from '../components/nvd3/nvd3.module';
import { GeoLocationsWidget } from './geo-location.directive';


export const routes = [
  { path: '', component: DetailComponent, pathMatch: 'full' }
];


@NgModule({
  imports: [
    //WidgetModule,
  //  UtilsModule,
    RouterModule.forChild(routes),
    Nvd3ChartModule,
    CommonModule

  ],
  declarations: [
    AnimateNumber,
    DetailComponent,
    GeoLocationsWidget,

  ]
})
export class ProductsDetail {
  static routes = routes;
 }
