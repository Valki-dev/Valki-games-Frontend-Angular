import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GamesRoutingModule } from './games-routing.module';
import { AllListComponent } from './pages/all-list/all-list.component';
import { HttpClientModule } from '@angular/common/http';
import { InputComponent } from './sharedGames/input/input.component';
import { FormsModule } from '@angular/forms';
import { GameDetailsComponent } from './pages/game-details/game-details.component';
import { ButtonModule } from 'primeng/button';
import { SortGamesPipe } from './pipes/sort-games.pipe';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    AllListComponent,
    InputComponent,
    InputComponent,
    GameDetailsComponent,
    SortGamesPipe
  ],
  imports: [
    CommonModule,
    GamesRoutingModule,
    HttpClientModule,
    FormsModule,
    ButtonModule,
    RouterModule
  ]
})
export class GamesModule { }
