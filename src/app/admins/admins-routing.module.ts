import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AllGamesComponent } from './pages/all-games/all-games.component';
import { AddGameComponent } from './pages/add-game/add-game.component';
import { EditGameComponent } from './pages/edit-game/edit-game.component';

const routes: Routes = [
  {path: '', children: [
    {path: 'dashboard', component: DashboardComponent},
    {path: 'all-games', component: AllGamesComponent},
    { path: 'all-games/:id', component: EditGameComponent },
    {path: 'add-games', component: AddGameComponent},
    {path: '**', redirectTo: 'dashboard'}
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminsRoutingModule { }
