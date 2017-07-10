import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Linking } from './linking.component';

export const routes = [
  { path: '', component: Linking, pathMatch: 'full' }
];

@NgModule({
  declarations: [
    Linking
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes)

  ]

})
export class LinkingModule {
  static routes = routes;
}
