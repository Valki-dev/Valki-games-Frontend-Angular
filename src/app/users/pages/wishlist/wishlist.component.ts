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
  constructor(private userService: UserService, private router: Router) {}

  wishlist: WishlistItem[] = [];
  userLogged!: User;
  showAddCart: boolean = false;

  ngOnInit(): void {
    this.userLogged = this.userService.getUserLogged();
    this.userService.getUserWishlist(this.userLogged.id).subscribe(response => {
        this.wishlist = response;
    }, (err) => {
      this.router.navigate(['/error/server']);
    })
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
          this.router.navigate(['/error/server']);
        })
      }
    } 
  }

  deleteFromWishlist(productId: number) {
    if(productId && (this.userService.getUserLogged().id != "")) {
      const data = {
        userId: this.userService.getUserLogged().id,
        productId: productId
      }
      this.userService.deleteFromWishlist(data).subscribe(response => {
        if (response.status == 'OK') {
          this.userService.getUserWishlist(this.userLogged.id).subscribe(response => {
            if(response) {
              
              this.wishlist = response;
            }
          })
          this.router.navigate(['/user/wishlist']);
        }
      }, (err) => {
        this.router.navigate(['/error/server']);
      })
    }
  }

}
