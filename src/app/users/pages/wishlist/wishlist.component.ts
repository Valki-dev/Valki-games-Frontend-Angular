import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../interfaces/user.interface';
import { Router } from '@angular/router';
import { WishlistItem } from '../../interfaces/wishlistItem.interface';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent {
  constructor(private userService: UserService, private router: Router) { }

  wishlist: WishlistItem[] = [];
  // userLogged!: User;
  showAddCart: boolean = false;
  showErrorAddCart: boolean = false;

  ngOnInit(): void {
    // this.userLogged = this.userService.getUserLogged();
    if(this.userService.getUserLogged() !== null) {
      this.userService.getUserWishlist(this.userService.getUserLogged()!.id).subscribe(response => {
        this.wishlist = response;
      }, (err) => {
        this.router.navigate(['/error/server']);
      })
    } else {
      this.router.navigate(["/user/login"]);
    }
    
  }

  get userLogged(): User | null {
    return this.userService.getUserLogged();
  }

  addToCart(gameId: number) {
    if (this.userService.getUserLogged() !== null) {
      if (gameId && (this.userService.getUserLogged()!.id != "")) {

        const data = {
          userId: this.userService.getUserLogged()!.id,
          productId: gameId
        }
        this.userService.addToCart(data).subscribe(response => {
          if (response) {
            this.showAddCart = true;
            setTimeout(() => {
              this.showAddCart = false;
            }, 3000);
          }
        }, (err) => {
          if(err.status === 500) {
            this.router.navigate(['/error/server']);
          }

          if(err.status === 400) {
            this.showErrorAddCart = true;
            setTimeout(() => {
              this.showErrorAddCart = false;
            }, 3000);
          }
        })
      }
    } else {
      this.router.navigate(["/user/login"]);
    }
  }

  deleteFromWishlist(productId: number) {
    if(this.userService.getUserLogged() !== null) {
      if (productId && (this.userService.getUserLogged()!.id != "")) {
        const data = {
          userId: this.userService.getUserLogged()!.id,
          productId: productId
        }
        this.userService.deleteFromWishlist(data).subscribe(response => {
          console.log(response);
          if (response.status == 'OK') {
            this.userService.getUserWishlist(this.userService.getUserLogged()!.id).subscribe(response => {
              if (response) {
                this.wishlist = response;
              }
            })
            this.router.navigate(['/user/wishlist']);
          }
        }, (err) => {
          this.router.navigate(['/error/server']);
        })
      }
    } else {
      this.router.navigate(["/user/login"]);
    }
    
  }

}
