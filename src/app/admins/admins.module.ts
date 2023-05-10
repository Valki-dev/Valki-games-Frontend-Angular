import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddGameComponent } from './pages/add-game/add-game.component';
import { AdminsRoutingModule } from './admins-routing.module';
import { AllGamesComponent } from './pages/all-games/all-games.component';
import { ButtonModule } from 'primeng/button';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { RouterModule } from '@angular/router';
import { EditGameComponent } from './pages/edit-game/edit-game.component';


@NgModule({
  declarations: [
    DashboardComponent,
    AllGamesComponent,
    AddGameComponent,
    EditGameComponent
  ],
  imports: [
    CommonModule,
    AdminsRoutingModule,
    RouterModule,
    ButtonModule
  ]
})
export class AdminsModule { }
