import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Game } from '../interfaces/game.interface';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  constructor(private httpClient: HttpClient) { }

  private endpoint: string = "http://localhost:3000/api/v2/valki-games";

  private newGamesEndpoint: string = "http://localhost:3000/api/v1/videogames/new";

  private onOfferGamesEndpoint: string = "http://localhost:3000/api/v1/videogames/offers";

  private byGenderEndpoint: string = "http://localhost:3000/api/v1/videogames/gender";

  videoGames: Game[] = [];
  originalGames: Game[] = [];

  getVideoGames() {
    return this.videoGames;
  }

  getAllGames(): Observable<Game[]> {    
    return this.httpClient.get<Game[]>(`${this.endpoint}/games`);
  }

  getGamesByName(search:string): Observable<Game[]> {    
    return this.httpClient.get<Game[]>(`${this.endpoint}/search/${search}`);
  }

  getGameById(id: number): Observable<Game>{    
    return this.httpClient.get<Game>(`${this.endpoint}/games/${id}`);
  }

  getNewGames(): Observable<Game[]> {
    return this.httpClient.get<Game[]>(`${this.newGamesEndpoint}`);
  }

  getOnOfferGames(): Observable<Game[]> {
    return this.httpClient.get<Game[]>(`${this.onOfferGamesEndpoint}`)
  }

  getGamesByGender(gender: string): Observable<Game[]> {
    return this.httpClient.get<Game[]>(`${this.byGenderEndpoint}?gender=${gender}`);
  }

  updateGame(updateData: Object): Observable<any> {
    return this.httpClient.patch<any>(`${this.endpoint}`, updateData);
  }

}
