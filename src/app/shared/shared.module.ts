import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FooterComponent } from './footer/footer.component';
import {TieredMenuModule} from 'primeng/tieredmenu';
import { ButtonModule } from 'primeng/button';
import { DisabledButtonComponent } from './disabledButton/disabled-button/disabled-button.component';


@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    DisabledButtonComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    TieredMenuModule,
    ButtonModule
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    DisabledButtonComponent
  ]
})
export class SharedModule { }
