import { RouterModule, Routes } from '@angular/router';

import { BasketComponent } from './basket.component';
import { NgModule } from '@angular/core';

const routes: Routes = [
  {path:'', component:BasketComponent}
];

@NgModule({
  declarations: [],
  imports: [
     RouterModule.forChild(routes)
  ],
  exports : [
    RouterModule
  ]
})
export class BasketRoutingModule { }
