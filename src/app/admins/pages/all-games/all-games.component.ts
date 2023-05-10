import { Component, OnInit } from '@angular/core';
import { Game } from 'src/app/games/interfaces/game.interface';
import { GameService } from 'src/app/games/services/game.service';

@Component({
  selector: 'app-all-games',
  templateUrl: './all-games.component.html',
  styleUrls: ['./all-games.component.css']
})
export class AllGamesComponent implements OnInit {

  constructor(private gameService: GameService) { }

  // games: Game[] = [];
  // search: string = "";

  ngOnInit(): void {
    this.getAllGames();
  }

  getAllGames() {
    this.gameService.getAllGames().subscribe(response => {
      if (response.length > 0) {
        console.log({ response });

        this.gameService.originalGames = [...response];
        this.gameService.videoGames = [...response];
      }

    });
  }

  searchGame(search: string) {
    if(search.trim() === "") {
     this.getAllGames();
    } else if (search.length > 0) {
      this.gameService.videoGames = [...this.gameService.originalGames.filter(game => game.name.includes(search.toLowerCase()))];
    }
  }

  get getGames() {
    return this.gameService.videoGames;
  }

}
