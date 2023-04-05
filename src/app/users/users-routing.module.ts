import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { WishlistComponent } from './pages/wishlist/wishlist.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { AuthenticationGuard } from './guards/authentication.guard';
import { ShoppingCartComponent } from './pages/shopping-cart/shopping-cart.component';
import { PayingPageComponent } from './pages/paying-page/paying-page.component';

const routes: Routes = [
  {path: '', children: [
    {path: 'login', component: LoginComponent},
    {path: 'register', component: RegisterComponent},
    {path: 'wishlist', component: WishlistComponent, canActivate: [AuthenticationGuard]},
    {path: 'profile', component: ProfileComponent, canActivate: [AuthenticationGuard]},
    {path: 'cart', component: ShoppingCartComponent, canActivate: [AuthenticationGuard]},
    {path: 'paying', component: PayingPageComponent, canActivate:[AuthenticationGuard]},
    {path: '**', redirectTo: 'login'}
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
