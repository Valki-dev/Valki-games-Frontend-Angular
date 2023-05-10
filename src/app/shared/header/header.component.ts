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

  constructor(private gameService: GameService, private userService: UserService, private router: Router) { }

  showMenu: boolean = false;
  showMobileMenu: boolean = false;
  sortingMethod: string = "all";
  showGenders: boolean = false;
  showMobileGenders: boolean = false;
  logged: boolean = this.userService.getLogged();
  isAdmin: boolean = this.userService.getIsAdmin();
  

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

  get getUserLogged(): User {
    return this.userService.getUserLogged();
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

  getGamesByGender(gender: string) {
    this.gameService.videoGames = this.gameService.originalGames;
    const gamesByGender = [...this.gameService.videoGames].filter(videogame => videogame.gender.includes(gender));
    this.gameService.videoGames = gamesByGender;
  }

  toggleMenu() {
    this.showMenu ? this.showMenu = false : this.showMenu = true;
    this.logged = this.userService.getLogged();
  }

  logOut() {
    this.userService.setLogged(false);
    this.userService.setIsAdmin(false);

    const user: User = {
      id: "",
      userName: "",
      email: "",
      password: "",
      phoneNumber: "",
      subscriptionDate: new Date(),
      isAdmin: false
    }
    this.userService.setUserLogged(user);
  }

  showCart() {
    if(this.userService.getLogged()) {
      this.router.navigate(['/user/cart']);
    } else {
      Swal.fire('Primero debes iniciar sesión');
      this.router.navigate(['/user/login']);
    }
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
