//Angular imports
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

//Modules

import { SharedModule } from '../shared/shared.module';
import { UsersRoutingModule } from './users-routing.module';

//Components
import { LoginComponent } from './pages/login/login.component';

import { RegisterComponent } from './pages/register/register.component';
import { ShoppingCartComponent } from './pages/shopping-cart/shopping-cart.component';
import { VerificationTokenComponent } from './pages/verification-token/verification-token.component';
import { WishlistComponent } from './pages/wishlist/wishlist.component';
import { PaymentPageComponent } from './pages/payment-page/payment-page.component';
import { PrimeNgModule } from '../prime-ng/prime-ng.module';
import { ProfileComponent } from './pages/profile/profile.component';
import { SaleDetailComponent } from './pages/sale-detail/sale-detail.component';
import { GratitudeComponent } from './pages/gratitude/gratitude.component';


@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    ShoppingCartComponent,
    VerificationTokenComponent,
    WishlistComponent,
    PaymentPageComponent,
    ProfileComponent,
    SaleDetailComponent,
    GratitudeComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    PrimeNgModule,
    ReactiveFormsModule,
    RouterModule,
    SharedModule,
    UsersRoutingModule,
  ]
})
export class UsersModule { }
