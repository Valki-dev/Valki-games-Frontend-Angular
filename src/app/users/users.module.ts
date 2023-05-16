//Angular imports
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

//Modules
import { PrimeNgModule } from '../prime-ng/prime-ng.module';
import { SharedModule } from '../shared/shared.module';
import { UsersRoutingModule } from './users-routing.module';

//Components
import { LoginComponent } from './pages/login/login.component';
import { PayingPageComponent } from './pages/paying-page/paying-page.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { RegisterComponent } from './pages/register/register.component';
import { ShoppingCartComponent } from './pages/shopping-cart/shopping-cart.component';
import { VerificationTokenComponent } from './pages/verification-token/verification-token.component';
import { WishlistComponent } from './pages/wishlist/wishlist.component';


@NgModule({
  declarations: [
    LoginComponent,
    PayingPageComponent,
    ProfileComponent,
    RegisterComponent,
    ShoppingCartComponent,
    VerificationTokenComponent,
    WishlistComponent,
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
