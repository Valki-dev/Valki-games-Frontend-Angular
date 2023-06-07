import { NgModule } from '@angular/core';

import { AutoFocusModule } from 'primeng/autofocus';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { InputMaskModule } from 'primeng/inputmask';
import { PasswordModule } from 'primeng/password';
import { TieredMenuModule } from 'primeng/tieredmenu';
import { VirtualScrollerModule } from 'primeng/virtualscroller';
import { ToastModule } from 'primeng/toast';
import { PaginatorModule } from 'primeng/paginator';
import { InputTextModule } from 'primeng/inputtext';
import { ChartModule } from 'primeng/chart';
import { FieldsetModule } from 'primeng/fieldset';
import { FileUploadModule } from 'primeng/fileupload';
import { TableModule } from 'primeng/table';
import { CheckboxModule } from 'primeng/checkbox';
import { TreeSelectModule } from 'primeng/treeselect';

@NgModule({
  exports: [
    AutoFocusModule,
    ButtonModule,
    DropdownModule,
    InputMaskModule,
    PasswordModule,
    TieredMenuModule,
    VirtualScrollerModule,
    ToastModule,
    PaginatorModule,
    InputTextModule,
    ChartModule,
    FieldsetModule,
    FileUploadModule,
    TableModule,
    CheckboxModule,
    TreeSelectModule
  ]
})
export class PrimeNgModule { }
