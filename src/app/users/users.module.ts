import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AutoFocusModule } from 'primeng/autofocus';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { InputMaskModule } from 'primeng/inputmask';
import { PasswordModule } from 'primeng/password';
import { PayingPageComponent } from './pages/paying-page/paying-page.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { LoginComponent } from './pages/login/login.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { RegisterComponent } from './pages/register/register.component';
import { ShoppingCartComponent } from './pages/shopping-cart/shopping-cart.component';
import { UsersRoutingModule } from './users-routing.module';
import { VirtualScrollerModule } from 'primeng/virtualscroller';
import { WishlistComponent } from './pages/wishlist/wishlist.component';


@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    WishlistComponent,
    ProfileComponent,
    ShoppingCartComponent,
    PayingPageComponent
  ],
  imports: [
    CommonModule,
    AutoFocusModule,
    ButtonModule,
    DropdownModule,
    FormsModule,
    HttpClientModule,
    InputMaskModule,
    PasswordModule,
    ReactiveFormsModule,
    RouterModule,
    SharedModule,
    UsersRoutingModule,
    VirtualScrollerModule,
  ]
})
export class UsersModule { }
