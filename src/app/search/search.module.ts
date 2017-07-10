import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SearchComponent } from './search.component'
import { WidgetModule } from '../layout/widget/widget.module';

export const routes = [
  { path: '', component: SearchComponent, pathMatch: 'full' }
];

@NgModule({
  declarations: [
    SearchComponent
  ],
  imports: [
    CommonModule,
    WidgetModule,
    FormsModule,
    RouterModule.forChild(routes)

  ]

})
export class SearchModule {
  static routes = routes;
}
