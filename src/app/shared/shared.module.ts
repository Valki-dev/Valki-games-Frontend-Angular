//Angular imports
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

//Components
import { ButtonModule } from 'primeng/button';
import { DisabledButtonComponent } from './disabledButton/disabled-button/disabled-button.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { TieredMenuModule } from 'primeng/tieredmenu';


@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    DisabledButtonComponent
  ],
  imports: [
    CommonModule,
    ButtonModule,
    FormsModule,
    RouterModule,
    TieredMenuModule
  ],
  exports: [
    DisabledButtonComponent,
    FooterComponent,
    HeaderComponent
  ]
})
export class SharedModule { }
