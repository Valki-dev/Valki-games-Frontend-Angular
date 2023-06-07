import { NgModule } from '@angular/core';
import { RouterModule, Routes, CanActivate } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { WishlistComponent } from './pages/wishlist/wishlist.component';
import { AuthenticationGuard } from './guards/authentication.guard';
import { ShoppingCartComponent } from './pages/shopping-cart/shopping-cart.component';
import { VerificationTokenComponent } from './pages/verification-token/verification-token.component';
import { PaymentPageComponent } from './pages/payment-page/payment-page.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { SaleDetailComponent } from './pages/sale-detail/sale-detail.component';
import { GratitudeComponent } from './pages/gratitude/gratitude.component';

const routes: Routes = [
  {path: '', children: [
    {path: 'login', component: LoginComponent},
    {path: 'register', component: RegisterComponent},
    {path: 'wishlist', component: WishlistComponent, canActivate: [AuthenticationGuard]},
    {path: 'profile', component: ProfileComponent, canActivate: [AuthenticationGuard]},
    {path: 'cart', component: ShoppingCartComponent, canActivate: [AuthenticationGuard]},
    {path: 'paying/:total', component: PaymentPageComponent, canActivate:[AuthenticationGuard]},
    {path: 'gratitude', component: GratitudeComponent, canActivate: [AuthenticationGuard]},
    {path: 'sale-detail/:orderNumber', component: SaleDetailComponent, canActivate: [AuthenticationGuard]},
    {path: 'verification/:email', component: VerificationTokenComponent},
    {path: '**', redirectTo: 'login'}
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
