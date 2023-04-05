import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FooterComponent } from './footer/footer.component';
import {TieredMenuModule} from 'primeng/tieredmenu';
import { ButtonModule } from 'primeng/button';


@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent
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
    FooterComponent
  ]
})
export class SharedModule { }
