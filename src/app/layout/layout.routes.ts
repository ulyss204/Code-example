import { Routes, RouterModule }  from '@angular/router';
import { Layout } from './layout.component';

// noinspection TypeScriptValidateTypes
const routes: Routes = [
  { path: '', component: Layout, children: [
    { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    { path: 'dashboard', loadChildren: '../products/products.module#ProductsModule' },
    { path: 'inbox', loadChildren: '../inbox/inbox.module#InboxModule' },
    //{ path: 'charts', loadChildren: '../charts/charts.module#ChartsModule' },
    { path: 'profile', loadChildren: '../profile/profile.module#ProfileModule' },
    { path: 'forms', loadChildren: '../forms/forms.module#FormModule' },
    { path: 'ui', loadChildren: '../ui-elements/ui-elements.module#UiElementsModule' },
    //{ path: 'extra', loadChildren: '../extra/extra.module#ExtraModule' },
    { path: 'tables', loadChildren: '../tables/tables.module#TablesModule' },
    { path: 'maps', loadChildren: '../maps/maps.module#MapsModule' },
    { path: 'grid', loadChildren: '../grid/grid.module#GridModule' },
    //{ path: 'widgets', loadChildren: '../widgets/widgets.module#WidgetsModule' },
    { path: 'labeling/linkings/:id', loadChildren: '../linking/linking.module#LinkingModule' },
    { path: 'products/:id', loadChildren: '../products-detail/products-detail.module#ProductsDetail' },
    { path: 'labeling/search', loadChildren: '../search/search.module#SearchModule' },
    { path: 'labeling/review', loadChildren: '../review/review.module#ReviewModule' }
  ]}
];

export const ROUTES = RouterModule.forChild(routes);
