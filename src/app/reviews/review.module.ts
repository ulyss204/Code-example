import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Review } from './review.component'

export const routes = [
  { path: '', component: Review
  //, pathMatch: 'full'
}
];

@NgModule({
  declarations: [
    Review
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes)

  ]

})
export class ReviewModule {
  static routes = routes;
}
