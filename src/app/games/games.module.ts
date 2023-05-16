//Angular imports
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

//Modules
import { GamesRoutingModule } from './games-routing.module';
import { PrimeNgModule } from '../prime-ng/prime-ng.module';

//Components
import { AllListComponent } from './pages/all-list/all-list.component';
import { GameDetailsComponent } from './pages/game-details/game-details.component';
import { InputComponent } from './sharedGames/input/input.component';

//Pipes
import { SortGamesPipe } from './pipes/sort-games.pipe';


@NgModule({
  declarations: [
    AllListComponent,
    InputComponent,
    GameDetailsComponent,
    SortGamesPipe
  ],
  imports: [
    CommonModule,
    
    FormsModule,
    GamesRoutingModule,
    HttpClientModule,
    PrimeNgModule,
    RouterModule,
  ]
})
export class GamesModule { }
