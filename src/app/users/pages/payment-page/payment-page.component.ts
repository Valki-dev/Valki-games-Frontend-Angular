import { AfterViewInit, Component, ElementRef, NgZone, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../../services/user.service';
import { CartItem } from '../../interfaces/cartItem.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { GameService } from 'src/app/games/services/game.service';

@Component({
  selector: 'app-payment-page',
  templateUrl: './payment-page.component.html',
  styleUrls: ['./payment-page.component.css']
})
export class PaymentPageComponent implements AfterViewInit, OnInit, OnDestroy {
  
  
  @ViewChild("cardInfo") 
  cardInfo!: ElementRef<HTMLInputElement>;

  public cardError: any;
  public card: any = null;
  public cart: CartItem[] = [];
  public total: number = 0;
  public showSpinner: boolean = false;
  public showPaymentError: boolean = false;

  constructor(
    private ngZone: NgZone, 
    private userService: UserService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private gameService: GameService
  ) {}
  ngOnDestroy(): void {
    this.card.destroy();
    this.card = null;
  }

  ngOnInit(): void {
    this.getUserShoppingCart();
    this.activatedRoute.params.subscribe(response => this.total = response["total"]);
    console.log(this.total);
  }

  ngAfterViewInit(): void {
    if(this.card == null) {
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
    
  }

  async getToken() {
    const {token, error} = await stripe.createToken(this.card);
    
    if(token) {      
      this.showSpinner = true;
      this.userService.chargePayment(this.total, token.id).subscribe(response => {
        if(response) {
          this.showPaymentError = false;
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
                        let totalPrice = item.amount * (response.onOfferPrice > 0 ? response.onOfferPrice : response.price);
          
                        let data = {
                          userId: this.userService.getUserLogged()!.id,
                          email: this.userService.getUserLogged()!.email,
                          productId: item.productId,
                          amount: item.amount,
                          price: totalPrice
                        } 
          
                        this.userService.addToSales(data).subscribe(response => {
          
                        })
          
                        this.userService.deleteFromCart(data).subscribe(response => {
          
                        })
                        this.showSpinner = false;
                        this.router.navigate(['/user/gratitude']);
                      }
                    });
                  } 
                }, (err) => {
                  this.showSpinner = false;
                  this.router.navigate(['/error/server']);
                })
              }
            });
          } else {
            this.router.navigate(["/user/login"]);
          }
        }
        
        //!CONTROLAR ERROR
      }, (err) => {
        this.showSpinner = false;
        this.showPaymentError = true;
      });

      
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
