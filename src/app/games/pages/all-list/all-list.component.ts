import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Game } from '../../interfaces/game.interface';
import { GameService } from '../../services/game.service';

@Component({
  selector: 'app-all-list',
  templateUrl: './all-list.component.html',
  styleUrls: ['./all-list.component.css']
})
export class AllListComponent implements OnInit {

  games: Game[] = [];
  public page!: number;
  search: string = "";
  showOptions: boolean = false;
  sortingMethod: string = "";
  methodSelected: boolean = false;

  constructor(private gameService: GameService, private router: Router) { }

  ngOnInit(): void {
    this.getAllGames();
  }

  get getVideoGames() {
    return [...this.gameService.getVideoGames()];
  }

  getAllGames() {
    this.gameService.getAllGames().subscribe((response: any) => {
      this.games = [...response];
      this.gameService.videoGames = [...response];
      this.gameService.originalGames = [...response];
    }, (err) => {
      this.router.navigate(['/error/server']);
    })
  }

  searchGamesByName(search: string) {
    if (search) {
      this.gameService.getGamesByName(search).subscribe((response: any) => {        
        if (response.length > 0) {
          this.games = response;
          this.gameService.videoGames = response;
        } else {
          this.games = [];
          this.gameService.videoGames = []
        }
      })
    } else {
      this.getAllGames();
    }
  }

  toggleShowOptions() {
    this.showOptions ? this.showOptions = false : this.showOptions = true;
  }

  sortGames(method: any) {
    this.sortingMethod = method;
    this.toggleShowOptions();
    this.methodSelected = true;
    this.router.navigate(['/all/games']);
  }

  clearSort() {
    this.methodSelected = false;
    this.sortingMethod = "";
    this.gameService.videoGames = [...this.gameService.originalGames];
    this.router.navigate(['/all/games']);
  }

}
