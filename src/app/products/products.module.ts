import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { RouterModule } from '@angular/router';
//import { JqSparklineModule } from '../components/sparkline/sparkline.module';
import { Products } from './products.component.ts';
//import { JsonPipe } from '../layout/pipes/json.pipe';
//import { CoolLoadingIndicatorModule } from 'angular2-cool-loading-indicator';

export const routes = [
  { path: '', component: Products, pathMatch: 'full' }
];

@NgModule({
  imports: [
    CommonModule,
    //JqSparklineModule,
    //CoolLoadingIndicatorModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    Products,
    //JsonPipe
  ],

})
export class ProductsModule {
  static routes = routes;
}
