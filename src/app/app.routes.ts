import { Routes } from '@angular/router';
import { ErrorComponent } from './error/error.component';
import { AuthGuard } from './login/login-guard.service';
import { Login } from './login/login.component';
import { Signup } from './signup/signup.component';
import { Load} from './load/load.component';

export const ROUTES: Routes = [{
   path: '', redirectTo: 'login',pathMatch: 'full'
  }, {
    path: 'app', loadChildren: './layout/layout.module#LayoutModule',canActivate: [AuthGuard]
  }, {
    path: 'login',  component: Login
  }, {
    path: 'signup', component: Signup
  }, {
    path: 'load', component: Load , canActivate: [AuthGuard]
  },{
    path: 'error', component: ErrorComponent
  }, {
    path: '**',    component: ErrorComponent
  }
];
