import { Component } from '@angular/core';
import { GameService } from '../../games/services/game.service';
import { UserService } from '../../users/services/user.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { User } from 'src/app/users/interfaces/user.interface';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  public isAdmin: boolean = this.userService.getIsAdmin();
  public showGenders: boolean = false;
  public showMenu: boolean = false;
  public showMobileGenders: boolean = false;
  public showMobileMenu: boolean = false;
  public sortingMethod: string = "all";
  
  constructor(private gameService: GameService, private userService: UserService, private router: Router) { }

  get userLogged(): User | null {
    return this.userService.getUserLogged();
  }

  getAllGames() {
    this.gameService.getAllGames().subscribe((response: any) => {
      if(response) {
        this.gameService.videoGames = [...response];
        this.gameService.originalGames = [...response];
      }
    }, (err) => {
      this.router.navigate(['/error/server']);
    })    
  }

  getGamesByGender(gender: string) {
    this.gameService.videoGames = this.gameService.originalGames;
    const gamesByGender = [...this.gameService.videoGames].filter(videogame => videogame.gender.includes(gender));
    this.gameService.videoGames = gamesByGender;
  }

  getNewGames() {
    this.gameService.videoGames = this.gameService.originalGames;
    const newGames = [...this.gameService.getVideoGames()].filter(viadeogame => viadeogame.isNew);
    this.gameService.videoGames = newGames;
  }

  getOnOfferGames() {
    this.gameService.videoGames = this.gameService.originalGames;
    const onOfferGames = [...this.gameService.getVideoGames()].filter(videogame => videogame.onOffer);
    this.gameService.videoGames = onOfferGames;
  }

  logOut() {
    this.userService.setIsAdmin(false);
    this.userService.setUserLogged(null);
    sessionStorage.clear();
  }

  showCart() {
    if(this.userService.getUserLogged() !== null) {
      this.router.navigate(['/user/cart']);
    } else {
      Swal.fire('Primero debes iniciar sesión');
      this.router.navigate(['/user/login']);
    }
  }
  
  toggleMenu() {
    this.showMenu ? this.showMenu = false : this.showMenu = true;
  }

  toggleMobileMenu() {
    this.showMobileMenu ? this.showMobileMenu = false : this.showMobileMenu = true;
  }

  toggleShowGenders() {
    this.showGenders ? this.showGenders = false : this.showGenders =  true;
  }

  toggleShowMobileGenders() {
    this.showMobileGenders ? this.showMobileGenders = false : this.showMobileGenders = true;
  }

}
