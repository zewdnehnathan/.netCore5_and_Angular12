import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { ProductDetailsComponent } from './shop/product-details/product-details.component';
import { ShopComponent } from './shop/shop.component';
import { shopParams } from './shared/models/shopParams';

const routes: Routes = [
 {path:'',component:HomeComponent,data:{breadcrumb:'Home'}},
 {path:'shop',loadChildren:()=> import('./shop/shop.module').then(mod=>mod.ShopModule),
 data:{breadcrumb:'Shop'}},
 {path:'**',redirectTo:'',pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
