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

  userLogged!: User;
  cart: CartItem[] = [];
  total: number = 0;

  ngOnInit(): void {
    this.userLogged = this.userService.getUserLogged();
    this.getUserShoppingCart();
  }

  getUserShoppingCart() {
    this.userService.getUserShoppingCart(this.userLogged.id).subscribe(response => {
      if (response) {
        this.cart = response;
        this.total = this.calculateTotal();
      }
    }, (err) => {
      this.router.navigate(['/error/server']);
    }) 
  }

  calculateTotal() {
    let totalAmount = this.cart.reduce((total, item) => total += (item.price * item.amount), 0);
    return Number(totalAmount.toFixed(2))
  }

  deleteFromCart(productId: number) {
    if (productId && (this.userService.getUserLogged().id != "")) {
      const data = {
        userId: this.userService.getUserLogged().id,
        productId: productId
      }

      this.userService.deleteFromCart(data).subscribe(response => {
        if (response.status == 'OK') {
          this.userService.getUserShoppingCart(this.userLogged.id).subscribe(response => {
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
  }

  changeAmount(productId: number, selectValue: any) {
    if(this.userService.getLogged()) {
      if(productId && (this.userService.getUserLogged().id)) {
        const data = {
          userId: this.userService.getUserLogged().id,
          productId: productId,
          amount: Number(selectValue)
        }

        this.userService.updateAmount(data).subscribe(response => {
          if(response) {
            this.getUserShoppingCart();
            this.total = this.calculateTotal();
            this.router.navigate(['/user/cart']);
          }
        }, (err) => {
          this.router.navigate(['/error/server']);
        })
      }
    }
  }

  pay() {
    this.cart.forEach(item => {
      let updateData = {
        productId: item.productId,
        amount: item.amount
      }
      this.gameService.updateGame(updateData).subscribe(response => {
        if(response.status === "OK") {
          let data = {
            userId: this.userService.getUserLogged().id,
            productId: item.productId
          }

          this.userService.addToSales(data).subscribe(response => {
            
          })

          this.userService.deleteFromCart(data).subscribe(response => {

          })
          this.router.navigate(['/user/paying'])
        }
      }, (err) => {
        this.router.navigate(['/error/server']);
      })
    });
  }

}


