import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { PasswordModule } from 'primeng/password';
import { InputMaskModule } from 'primeng/inputmask';
import { ButtonModule } from 'primeng/button';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { WishlistComponent } from './pages/wishlist/wishlist.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { ShoppingCartComponent } from './pages/shopping-cart/shopping-cart.component';
import { AutoFocusModule } from 'primeng/autofocus';
import { VirtualScrollerModule } from 'primeng/virtualscroller';
import { DropdownModule } from 'primeng/dropdown';
import { PayingPageComponent } from './pages/paying-page/paying-page.component';
import { RouterModule } from '@angular/router';


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
    UsersRoutingModule,
    PasswordModule,
    InputMaskModule,
    ButtonModule,
    HttpClientModule,
    FormsModule,
    SharedModule,
    ReactiveFormsModule,
    AutoFocusModule,
    VirtualScrollerModule,
    DropdownModule,
    RouterModule,
    ReactiveFormsModule
  ]
})
export class UsersModule { }
