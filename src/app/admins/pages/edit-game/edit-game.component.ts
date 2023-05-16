import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Game } from 'src/app/games/interfaces/game.interface';
import { GameService } from 'src/app/games/services/game.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-game',
  templateUrl: './edit-game.component.html',
  styleUrls: ['./edit-game.component.css']
})
export class EditGameComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute, private gameService: GameService, private router: Router) {}

  public videogame!: Game;
  public updateError: boolean = false;

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(({id}) => {
      this.gameService.getGameById(id).subscribe( response => {
        this.videogame = response;
      })
    })
  }

  updateVideogame(id: number, stock: string, price: string, onOffer: string, isNew: string) {

    const updateData = {
      id: id,
      stock: parseInt(stock),
      price: parseFloat(price),
      onOffer: parseInt(onOffer),
      isNew: (isNew === "true" ? true : false)
    }

    this.gameService.updateGame(updateData).subscribe(response => {
      if(response.status === "OK") {
        Swal.fire('Se ha editado el videojuego', '', 'success')
        this.router.navigate(["admin/all-games"]);
      }
    })
  }

}
