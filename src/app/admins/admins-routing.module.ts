import { NgModule } from '@angular/core';
import { RouterModule, Routes, CanActivate } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AllGamesComponent } from './pages/all-games/all-games.component';
import { AddGameComponent } from './pages/add-game/add-game.component';
import { EditGameComponent } from './pages/edit-game/edit-game.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { AdminAuthenticationGuard } from './guards/admin-authentication.guard';

const routes: Routes = [
  {path: '', children: [
    { path: 'dashboard', component: DashboardComponent, canActivate: [AdminAuthenticationGuard] },
    { path: 'all-games', component: AllGamesComponent, canActivate: [AdminAuthenticationGuard] },
    { path: 'all-games/:id', component: EditGameComponent, canActivate: [AdminAuthenticationGuard] },
    { path: 'add-games', component: AddGameComponent, canActivate: [AdminAuthenticationGuard] },
    { path: 'profile', component: ProfileComponent, canActivate: [AdminAuthenticationGuard] },
    { path: '**', redirectTo: 'dashboard' }
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminsRoutingModule { }
