import { Component, OnInit } from '@angular/core';
import { RankingGame } from 'src/app/games/interfaces/rankingGame.interface';
import { GameService } from 'src/app/games/services/game.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  public data: any;
  public gameRanking: RankingGame[] = [];
  public genres: string[] = [];
  public genresValue: number[] = [];
  public options: any;

  constructor(private gameService: GameService) { }

  ngOnInit() {
    this.gameService.getGameRanking().subscribe(response => {
      if (response.length > 0) {
        this.gameRanking = response;
      }
    })

    this.gameService.getBestSellingGenres().subscribe(response => {
      response.forEach((element: any) => {
        this.genresValue.push(element.data);
        this.genres.push(element.gender);

        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');
        this.data = {
          labels: this.genres,
          datasets: [
            {
              data: this.genresValue,
              backgroundColor: [documentStyle.getPropertyValue('--blue-500'), documentStyle.getPropertyValue('--yellow-500'), documentStyle.getPropertyValue('--green-500')],
              hoverBackgroundColor: [documentStyle.getPropertyValue('--blue-400'), documentStyle.getPropertyValue('--yellow-400'), documentStyle.getPropertyValue('--green-400')]
            }
          ]
        };

        this.options = {
          cutout: '60%',
          plugins: {
            legend: {
              labels: {
                color: textColor
              }
            }
          }
        };
      });
    });
  }
}
