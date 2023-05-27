//Angular imports
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

//Modules
import { GamesRoutingModule } from './games-routing.module';
import { PrimeNgModule } from '../prime-ng/prime-ng.module';
import { NgxPaginationModule } from 'ngx-pagination';


//Components
import { AllListComponent } from './pages/all-list/all-list.component';
import { GameDetailsComponent } from './pages/game-details/game-details.component';
import { InputComponent } from './sharedGames/input/input.component';

//Pipes
import { SortGamesPipe } from './pipes/sort-games.pipe';
import { SharedModule } from '../shared/shared.module';


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
    NgxPaginationModule,
    SharedModule
  ]
})
export class GamesModule { }
