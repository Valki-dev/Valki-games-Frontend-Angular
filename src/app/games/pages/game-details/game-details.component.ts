import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Game } from '../../interfaces/game.interface';
import { GameService } from '../../services/game.service';
import { UserService } from '../../../users/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-game-details',
  templateUrl: './game-details.component.html',
  styleUrls: ['./game-details.component.css']
})
export class GameDetailsComponent implements OnInit {

  constructor(private gameService: GameService, private userService: UserService, private activeRoute: ActivatedRoute, private router: Router) { }

  game!: Game;
  showAddWishlist: boolean = false;
  showAddCart: boolean = false;
  showErrorAddWishlist: boolean = false;
  showErrorAddCart: boolean = false;

  ngOnInit(): void {
    this.activeRoute.params.subscribe(({id}) => {
      this.gameService.getGameById(id).subscribe((response: any) => {
        this.game = response;
      })
    }, (err) => {
      this.router.navigate(['/error/server']);
    })
  }

  addToWishlist(gameId: number) {
    if(this.userService.getLogged()) {
      if(gameId && (this.userService.getUserLogged().id != "")) {
        const data = {
          userId: this.userService.getUserLogged().id,
          productId: gameId
        }

        this.userService.addToWishlist(data).subscribe(response => {
          this.showAddWishlist = true;
          setTimeout(() => {
            this.showAddWishlist = false;
          }, 3000);
        }, (err) => {
          if(err.status == 500) {
            this.router.navigate(['/error/server']);
          }

          if(err.status == 400) {
            this.showErrorAddWishlist = true;
            setTimeout(() => {
              this.showErrorAddWishlist = false;
            }, 3000);
          }
        })
      }
    } else {
      Swal.fire('Primero debes iniciar sesión');
      this.router.navigate(['/user/login']);
    }
  }

  addToCart(gameId: number) {
    if(this.userService.getLogged()) {
      if(gameId && (this.userService.getUserLogged().id != "")) {
        const data = {
          userId: this.userService.getUserLogged().id,
          productId: gameId
        }
        
        this.userService.addToCart(data).subscribe(response => {
          this.showAddCart = true;
          setTimeout(() => {
            this.showAddCart = false;
          }, 3000);
        }, (err) => {
          if(err.status == 500) {
            this.router.navigate(['/error/server']);
          }

          if(err.status == 400) {
            this.showErrorAddCart = true;
            setTimeout(() => {
              this.showErrorAddCart = false;
            }, 3000);
          }
        })
      }
    } else {
      Swal.fire('Primero debes iniciar sesión');
      this.router.navigate(['/user/login']);
    }
  }

}
