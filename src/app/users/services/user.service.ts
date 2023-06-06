import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../interfaces/user.interface';
import { CartItem } from '../interfaces/cartItem.interface';
import { WishlistItem } from '../interfaces/wishlistItem.interface';
import { Sale } from '../interfaces/sale.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient) {}

  // private logged: boolean = true;

  private isAdmin: boolean = false;

  private endpoint: string = "http://localhost:3000/api/v2/valki-games/users";

  private wishlistEndpoint: string = "http://localhost:3000/api/v1/videogames/wishlist";

  private cartEndpoint: string = "http://localhost:3000/api/v1/videogames/cart";

  
  // private userLogged: User = {
  //   id: "0fd04272-d5e2-477f-bbf1-342db0",
  //   userName: "Flavio",
  //   email: "flavio@gmail.com",
  //   password: "1234",
  //   phoneNumber: "645756656",
  //   subscriptionDate: new Date(),
  //   isAdmin: false
  // };
  

  // getLogged(): boolean {
  //   return this.logged;
  // }

  getUserLogged(): User | null {
    if(sessionStorage.getItem("userLogged")) {
      return JSON.parse(sessionStorage.getItem("userLogged")!);
    }

    return null;
  }

  getIsAdmin(): boolean {
    return this.isAdmin;
  }

  // setLogged(value: boolean): void {
  //   this.logged = value;
  // }

  setUserLogged(user: User | null): void {
    if(user !== null) {
      sessionStorage.setItem("userLogged", JSON.stringify(user));
      return;
    }
    sessionStorage.clear();
  }

  setIsAdmin(value: boolean): void {
    this.isAdmin = value;
  }

  chargePayment(amount: number, tokenId: string): Observable<any> {
    return this.httpClient.post<any>(`${this.endpoint}/payment`, { stripeToken: tokenId, amount: amount })
  }

  //<<-------------------- GET -------------------->>

  getUserById(userId: string): Observable<User> {
    return this.httpClient.get<User>(`${this.endpoint}/${userId}`)
  }

  getUserWishlist(userId: string): Observable<WishlistItem[]> {
    return this.httpClient.get<WishlistItem[]>(`${this.endpoint}/wishlist/${userId}`)
  }

  getUserShoppingCart(userId: string): Observable<CartItem[]> {
    return this.httpClient.get<CartItem[]>(`${this.endpoint}/cart/${userId}`);
  }

  getUserSales(userId: string): Observable<Sale[]> {
    return this.httpClient.get<Sale[]>(`${this.endpoint}/sales/${userId}`);
  }

  public comparePassword(data: any): Observable<any> {
    return this.httpClient.post<boolean>(`${this.endpoint}/password`, data);
  }

  getSaleByOrderNumber(orderNumber: string): Observable<Sale> {
    return this.httpClient.get<Sale>(`${this.endpoint}/order/${orderNumber}`);
  }


  //<<-------------------- POST -------------------->>

  createUser(user: User): Observable<any> {
    return this.httpClient.post<any>(`${this.endpoint}`, user);
  }

  logIn(data: Object): Observable<User> {
    return this.httpClient.post<User>(`${this.endpoint}/login`, data);
  }

  addToWishlist(data: Object): Observable<Object> {
    return this.httpClient.post<Object>(`${this.endpoint}/wishlist`, data);
  }

  addToCart(data: Object): Observable<Object> {
    return this.httpClient.post<Object>(`${this.endpoint}/cart`, data);
  }

  addToSales(data: Object): Observable<Object> {
    return this.httpClient.post<Object>(`${this.endpoint}/sales`, data);
  }

  //<<-------------------- DELETE -------------------->>

  deleteUser(id: string): Observable<any> {
    return this.httpClient.delete<any>(`${this.endpoint}/${id}`);
  }

  deleteFromWishlist(data: any): Observable<any> {
    return this.httpClient.delete<any>(`${this.endpoint}/wishlist/${data.userId}?productId=${data.productId}`);
  }

  deleteFromCart(data: any): Observable<any> {
    return this.httpClient.delete<any>(`${this.endpoint}/cart/${data.userId}?productId=${data.productId}`);
  }

  //<<-------------------- UPDATE -------------------->>

  updateAmount(data: any): Observable<any> {
    return this.httpClient.patch<any>(`${this.endpoint}/cart`, data);
  }

  updateUser(data: any): Observable<any> {
    return this.httpClient.patch<any>(`${this.endpoint}`, data);
  }

  updatePassword(data: any): Observable<any> {
    return this.httpClient.patch<any>(`${this.endpoint}/password`, data);
  }

  verifyAccount(data: any): Observable<any> {
    return this.httpClient.patch<any>(`${this.endpoint}/verification`, data);
  }

}
