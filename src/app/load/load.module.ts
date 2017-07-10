import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Load } from './load.component';
import { CommonModule } from '@angular/common';
export const routes = [
  { path: '', component: Load, pathMatch: 'full' }
];

@NgModule({
  declarations: [
    Load

  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)

  ]
})
export class LoadModule {
  static routes = routes;
}
