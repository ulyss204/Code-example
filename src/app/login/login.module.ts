import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AUTH_PROVIDERS } from 'angular2-jwt';
import { MessengerDemo } from '../ui-elements/notifications/messenger/messenger.directive';

import { Login } from './login.component';


export const routes = [
  { path: '', component: Login, pathMatch: 'full' }
];

@NgModule({
  declarations: [
    Login,
    MessengerDemo

  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes)

  ]
})
export class LoginModule {
  static routes = routes;
}
