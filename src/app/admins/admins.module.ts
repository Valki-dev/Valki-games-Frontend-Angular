//Angular imports
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

//Modules
import { AdminsRoutingModule } from './admins-routing.module';
import { PrimeNgModule } from '../prime-ng/prime-ng.module';

//Components
import { AddGameComponent } from './pages/add-game/add-game.component';
import { AllGamesComponent } from './pages/all-games/all-games.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { EditGameComponent } from './pages/edit-game/edit-game.component';
import { ProfileComponent } from './pages/profile/profile.component';


@NgModule({
  declarations: [
    AddGameComponent,
    AllGamesComponent,
    DashboardComponent,
    EditGameComponent,
    ProfileComponent,
  ],
  imports: [
    CommonModule,
    AdminsRoutingModule,
    FormsModule,
    PrimeNgModule,
    RouterModule,
  ]
})
export class AdminsModule { }
