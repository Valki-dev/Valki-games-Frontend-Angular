import { AfterViewInit, Component, ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../../services/user.service';
import { CartItem } from '../../interfaces/cartItem.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { GameService } from 'src/app/games/services/game.service';

@Component({
  selector: 'app-payment-page',
  templateUrl: './payment-page.component.html',
  styleUrls: ['./payment-page.component.css']
})
export class PaymentPageComponent implements AfterViewInit, OnInit {
  
  
  @ViewChild("cardInfo") 
  cardInfo!: ElementRef<HTMLInputElement>;

  public cardError: any;
  public card: any;
  public cart: CartItem[] = [];
  public total: number = 0;

  constructor(
    private ngZone: NgZone, 
    private userService: UserService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private gameService: GameService
  ) {}

  ngOnInit(): void {
    this.getUserShoppingCart();
    this.activatedRoute.params.subscribe(response => this.total = response["total"]);
    console.log(this.total);
    
  }

  ngAfterViewInit(): void {
    this.card = elements.create('card', {
      style: {
        base: {
          iconColor: "#ff0000",
          color: "#ffffff",
          fontSize: "20px",
        }
      }, 
      appearance: {
        
      }
    });
    this.card.mount(this.cardInfo.nativeElement);
    this.card.addEventListener('change', this.onChange.bind(this));
  }

  async getToken() {
    const {token, error} = await stripe.createToken(this.card);
    
    if(token) {
      console.log(token);
      
      this.userService.chargePayment(this.total, token.id).subscribe(response => {
        if(response) {
          if(this.userService.getUserLogged() !== null) {
            this.cart.forEach(item => {
              if(item.products.stock > 0) {
                let updateData = {
                  productId: item.productId,
                  amount: item.amount
                }
                this.gameService.updateStock(updateData).subscribe(response => {
                  if (response.status === "OK") {
                    this.gameService.getGameById(item.productId).subscribe(response => {
                      if (response) {
                        let totalPrice = item.amount * (response.onOfferPrice !== null ? response.onOfferPrice : response.price);
          
                        let data = {
                          userId: this.userService.getUserLogged()!.id,
                          productId: item.productId,
                          amount: item.amount,
                          price: totalPrice
                        } 
          
                        this.userService.addToSales(data).subscribe(response => {
          
                        })
          
                        this.userService.deleteFromCart(data).subscribe(response => {
          
                        })
                        this.router.navigate(['/user/sale']);
                      }
                    });
                  } 
                }, (err) => {
                  this.router.navigate(['/error/server']);
                })
              }
            });
          } else {
            this.router.navigate(["/user/login"]);
          }
        }
        
      })

      //!CONTROLAR ERROR
      
    } else {
      this.ngZone.run(() => this.cardError = error.message);
    }
  }

  getUserShoppingCart() {
    if (this.userService.getUserLogged() !== null) {
      this.userService.getUserShoppingCart(this.userService.getUserLogged()!.id).subscribe(response => {
        if (response) {
          this.cart = response;          
        }
      }, (err) => {
        this.router.navigate(['/error/server']);
      });

    } else {
      this.router.navigate(["/user/login"]);
    }
  }

  onChange({error}: any) {
    if(error) {
      this.ngZone.run(() => this.cardError = error.message);
    } else {
      this.ngZone.run(() => this.cardError = null);
    }
    
  }


  // OTRA MANERA
  // private readonly STRIPE!: any;
  // private elementStripe!: any;

  // public cardNumber: any;
  // public cardCvc: any;
  // public cardExp: any;
  // public id!: string;
  // public orderData: any;
  // public userLogged!: User | null;

  // public payingForm: FormGroup = this.formBuilder.group({
  //   cardNumber: [false, [Validators.required, Validators.requiredTrue]],
  //   cadCvc: [false, [Validators.required, Validators.requiredTrue]],
  //   cardExp: [false, [Validators.required, Validators.requiredTrue]]
  // })

  // constructor(
  //   private userService: UserService,
  //   private formBuilder: FormBuilder
  // ) {
  //   this.STRIPE = window.stripe(environment.stripe_pk);
  // }

  // ngOnInit(): void {
  //   this.userLogged = this.userService.getUserLogged();
  // }

}
