import { Pipe, PipeTransform } from '@angular/core';
import { Game } from '../interfaces/game.interface';
import { GameService } from '../services/game.service';

@Pipe({
  name: 'sortGames'
})
export class SortGamesPipe implements PipeTransform {
  constructor(private gameService: GameService) {}

  transform(games: Game[], sortingMethod: string): Game[] {
    switch(sortingMethod) {
      case 'alphabetical': {
        sortingMethod = "";
        return games.sort((game1, game2) => game1.name.localeCompare(game2.name, undefined, {sensitivity: 'base'}));
      }
      case 'alphabeticalInverted': {
        return games.sort((game1, game2) => game2.name.localeCompare(game1.name));
      }
      case 'priceMin': {
        return games.sort((game1, game2) => game1.price > game2.price ? 1 : -1);
      }
      case 'priceMax': {
        return games.sort((game1, game2) => game1.price > game2.price ? -1 : 1);
      }
      case 'all': {
        return this.gameService.originalGames;
      }
      default: {
        return games;
      }
    }
  }

}
