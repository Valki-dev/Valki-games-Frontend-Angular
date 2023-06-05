import { Component } from '@angular/core';
import { User } from '../../interfaces/user.interface';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { CartItem } from '../../interfaces/cartItem.interface';
import { GameService } from '../../../games/services/game.service';


@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})

export class ShoppingCartComponent {

  constructor(private userService: UserService, private gameService: GameService, private router: Router) { }

  // userLogged!: User;
  cart: CartItem[] = [];
  total: number = 0;

  ngOnInit(): void {
    // this.userLogged = this.userService.getUserLogged();
    this.getUserShoppingCart();
  }

  get userLogged(): User | null {
    return this.userService.getUserLogged();
  }

  getUserShoppingCart() {
    if (this.userService.getUserLogged() !== null) {

      this.userService.getUserShoppingCart(this.userService.getUserLogged()!.id).subscribe(response => {
        if (response) {
          this.cart = response;
          this.total = this.calculateTotal();
        }
      }, (err) => {
        this.router.navigate(['/error/server']);
      });

    } else {
      this.router.navigate(["/user/login"]);
    }
  }

  calculateTotal() {
    let totalAmount = this.cart.filter(item => item.products.stock > 0).reduce((total, item) => total += ((item.products.onOfferPrice !== null ? item.products.onOfferPrice : item.products.price) * item.amount), 0);
    return Number(totalAmount.toFixed(2))
  }

  deleteFromCart(productId: number) {
    if (this.userService.getUserLogged() !== null) {
      if (productId && (this.userService.getUserLogged()!.id != "")) {
        const data = {
          userId: this.userService.getUserLogged()!.id,
          productId: productId
        }

        this.userService.deleteFromCart(data).subscribe(response => {
          if (response.status == 'OK') {
            this.userService.getUserShoppingCart(this.userService.getUserLogged()!.id).subscribe(response => {
              if (response) {
                this.cart = response;
                this.total = this.calculateTotal();
              }
            })
            this.router.navigate(['/user/cart']);
          }
        }, (err) => {
          this.router.navigate(['/error/server']);
        })
      }
    } else {
      this.router.navigate(["/user/login"]);
    }
  }

  changeAmount(productId: number, selectValue: any) {
    if (this.userService.getUserLogged() !== null) {

      if (productId && (this.userService.getUserLogged()!.id)) {
        const data = {
          userId: this.userService.getUserLogged()!.id,
          productId: productId,
          amount: Number(selectValue)
        }

        this.userService.updateAmount(data).subscribe(response => {
          if (response.status == "OK") {
            this.getUserShoppingCart();
            this.total = this.calculateTotal();
            this.router.navigate(['/user/cart']);
          }
        }, (err) => {
          this.router.navigate(['/error/server']);
        })
      }

    } else {
      this.router.navigate(["/user/login"]);
    }
  }

  pay() {
    this.router.navigate(['/user/paying', this.total]);
    // if(this.userService.getUserLogged() !== null) {
    //   this.cart.forEach(item => {
    //     if(item.products.stock > 0) {
    //       let updateData = {
    //         productId: item.productId,
    //         amount: item.amount
    //       }
    //       this.gameService.updateStock(updateData).subscribe(response => {
    //         if (response.status === "OK") {
    //           this.gameService.getGameById(item.productId).subscribe(response => {
    //             if (response) {
    //               let totalPrice = item.amount * (response.onOfferPrice !== null ? response.onOfferPrice : response.price);
    
    //               let data = {
    //                 userId: this.userService.getUserLogged()!.id,
    //                 productId: item.productId,
    //                 amount: item.amount,
    //                 price: totalPrice
    //               } 
    
    //               this.userService.addToSales(data).subscribe(response => {
    
    //               })
    
    //               this.userService.deleteFromCart(data).subscribe(response => {
    
    //               })
    //               this.router.navigate(['/user/paying'])
    //             }
    //           });
    //         } 
    //       }, (err) => {
    //         this.router.navigate(['/error/server']);
    //       })
    //     }
    //   });
    // } else {
    //   this.router.navigate(["/user/login"]);
    // }
  }

}


