import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Game } from '../interfaces/game.interface';
import { RankingGame } from '../interfaces/rankingGame.interface';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  constructor(private httpClient: HttpClient) { }

  private endpoint: string = "http://localhost:3000/api/v2/valki-games/games";
  // private endpoint: string = "https://valki-games-backend.up.railway.app/api/v2/valki-games/games";

  public videoGames: Game[] = [];
  public originalGames: Game[] = [];

  getVideoGames() {
    return this.videoGames;
  }

  //<<-------------------- POST -------------------->>
  createGame(formData: FormData): Observable<any> {
    return this.httpClient.post<any>(`${this.endpoint}`, formData);
  }

  //<<-------------------- GET -------------------->>

  getAllGames(): Observable<Game[]> {
    return this.httpClient.get<Game[]>(`${this.endpoint}`);
  }

  getGamesByName(search: string): Observable<Game[]> {
    return this.httpClient.get<Game[]>(`${this.endpoint}/search/${search}`);
  }

  getGameById(id: number): Observable<Game> {
    return this.httpClient.get<Game>(`${this.endpoint}/${id}`);
  }

  getGameRanking(): Observable<RankingGame[]> {
    return this.httpClient.get<RankingGame[]>(`${this.endpoint}/ranking`);
  }

  getBestSellingGenres(): Observable<any> {
    return this.httpClient.get<any>(`${this.endpoint}/best-selling`);
  }

  //<<-------------------- UPDATE -------------------->>
  updateGame(updateData: any): Observable<any> {
    return this.httpClient.patch<any>(`${this.endpoint}`, updateData);
  }

  updateStock(updateData: any): Observable<any> {
    return this.httpClient.patch<any>(`${this.endpoint}/stock`, updateData);
  }

  //<<-------------------- DELETE -------------------->>
  deleteGame(id: number): Observable<any> {
    return this.httpClient.delete<any>(`${this.endpoint}/${id}`);
  }
}
