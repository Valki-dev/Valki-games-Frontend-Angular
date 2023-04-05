import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ErrorRoutingModule } from './error-routing.module';
import { ErrorPageComponent } from './error-page/error-page.component';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    ErrorPageComponent
  ],
  imports: [
    CommonModule,
    ErrorRoutingModule,
    RouterModule
  ]
})
export class ErrorModule { }
