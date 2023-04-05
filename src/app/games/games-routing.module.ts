import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllListComponent } from './pages/all-list/all-list.component';
import { GameDetailsComponent } from './pages/game-details/game-details.component';

const routes: Routes = [
  {path: '', children: [
    {path: 'all', component: AllListComponent},
    {path: 'all/:id', component: GameDetailsComponent},
    {path: '**', redirectTo: 'all'}
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GamesRoutingModule { }
