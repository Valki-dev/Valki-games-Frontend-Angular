import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GameService } from 'src/app/games/services/game.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-all-games',
  templateUrl: './all-games.component.html',
  styleUrls: ['./all-games.component.css']
})
export class AllGamesComponent implements OnInit {

  constructor(private gameService: GameService, private router: Router) { }

  // games: Game[] = [];
  // search: string = "";

  ngOnInit(): void {
    this.getAllGames();
  }

  deleteGame(name: string, id: number) {
    Swal.fire({
      title: `¿Seguro que quieres borrar ${name}?`,
      showDenyButton: false,
      showCancelButton: true,
      confirmButtonText: 'Eliminar',
      cancelButtonText: `Cancelar`,
    }).then((result) => {
      if (result.isConfirmed) {

        this.gameService.deleteGame(id).subscribe(response => {
          if (response.status === "OK") {
            Swal.fire(`Se ha eliminado ${name}`, '', 'success');
            this.getAllGames();
            this.router.navigate(['admin/all-games']);
          }
        }, (err) => {
          this.router.navigate(['/error/server']);
        })
      } else {
        this.router.navigate(['admin/all-games']);
      }
    })
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
    if (search.trim() === "") {
      this.getAllGames();
    } else if (search.length > 0) {
      this.gameService.videoGames = [...this.gameService.originalGames.filter(game => game.name.includes(search.toLowerCase()))];
    }
  }

  get getGames() {
    return this.gameService.videoGames;
  }

}
