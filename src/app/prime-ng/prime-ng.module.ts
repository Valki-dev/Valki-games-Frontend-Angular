import { NgModule } from '@angular/core';

import { AutoFocusModule } from 'primeng/autofocus';
import { ButtonModule } from 'primeng/button';
import { ChartModule } from 'primeng/chart';
import { CheckboxModule } from 'primeng/checkbox';
import { DropdownModule } from 'primeng/dropdown';
import { FieldsetModule } from 'primeng/fieldset';
import { FileUploadModule } from 'primeng/fileupload';
import { InputMaskModule } from 'primeng/inputmask';
import { InputTextModule } from 'primeng/inputtext';
import { PaginatorModule } from 'primeng/paginator';
import { PasswordModule } from 'primeng/password';
import { TableModule } from 'primeng/table';
import { TieredMenuModule } from 'primeng/tieredmenu';
import { ToastModule } from 'primeng/toast';
import { TreeSelectModule } from 'primeng/treeselect';
import { VirtualScrollerModule } from 'primeng/virtualscroller';

@NgModule({
  exports: [
    AutoFocusModule,
    ButtonModule,
    ChartModule,
    CheckboxModule,
    DropdownModule,
    FieldsetModule,
    FileUploadModule,
    InputMaskModule,
    InputTextModule,
    PaginatorModule,
    PasswordModule,
    TableModule,
    TieredMenuModule,
    ToastModule,
    TreeSelectModule,
    VirtualScrollerModule
  ]
})
export class PrimeNgModule { }
