import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ErrorPageComponent } from './error-page/error-page.component';

const routes: Routes = [
  {path: "", children: [
    {path: 'server', component: ErrorPageComponent},
    {path: '**', redirectTo: 'server'}
  ]}
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ErrorRoutingModule { }
