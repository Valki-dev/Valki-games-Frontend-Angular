import { NgModule } from '@angular/core';

import { AutoFocusModule } from 'primeng/autofocus';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { InputMaskModule } from 'primeng/inputmask';
import { PasswordModule } from 'primeng/password';
import { VirtualScrollerModule } from 'primeng/virtualscroller';
import { ToastModule } from 'primeng/toast';

@NgModule({
  exports: [
    AutoFocusModule,
    ButtonModule,
    DropdownModule,
    InputMaskModule,
    PasswordModule,
    VirtualScrollerModule,
    ToastModule
  ]
})
export class PrimeNgModule { }
