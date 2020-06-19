import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompanyLogoComponent } from './company-logo/company-logo.component';
import { AppRoutingModule } from '../app-routing.module';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [CompanyLogoComponent],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [CompanyLogoComponent]
})
export class SharedModule { }
