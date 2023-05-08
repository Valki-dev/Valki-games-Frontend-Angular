import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminsRoutingModule } from './admins-routing.module';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { RouterModule } from '@angular/router';
import { AllGamesComponent } from './pages/all-games/all-games.component';
import { AddGameComponent } from './pages/add-game/add-game.component';


@NgModule({
  declarations: [
    DashboardComponent,
    AllGamesComponent,
    AddGameComponent
  ],
  imports: [
    CommonModule,
    AdminsRoutingModule,
    RouterModule
  ]
})
export class AdminsModule { }
