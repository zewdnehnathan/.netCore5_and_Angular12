import { BreadcrumbModule } from 'xng-breadcrumb';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SectionHeaderComponent } from './section-header/section-header.component';
import { SharedModule } from '../shared/shared.module';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [NavBarComponent, SectionHeaderComponent],
  imports: [
    CommonModule,
    RouterModule,
    BreadcrumbModule,
    SharedModule,
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right',
      preventDuplicates: true
    })
  ],
  exports:[NavBarComponent,SectionHeaderComponent]
})
export class CoreModule { }

