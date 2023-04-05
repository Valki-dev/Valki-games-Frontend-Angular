import { Component } from '@angular/core';
import { User } from '../../interfaces/user.interface';
import { UserService } from '../../services/user.service';
import { Sale } from '../../interfaces/sale.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {

  constructor(private userService: UserService, private router: Router) { }

  userLogged!: User;
  sales: Sale[] = [];
  showUpdateUser: boolean = false;
  password: string = "";
  password2: string = "";
  updateError: boolean = false;
  passwordError: boolean = false;
  showErrorUpdate: boolean = false;

  ngOnInit(): void {
    this.userLogged = this.userService.getUserLogged();
    this.getUserSales();
  }

  getUserSales() {
    this.userService.getUserSales(this.userLogged.id).subscribe(response => {
      if (response) {
        this.sales = response;
      }
    }, (err) => {
      this.router.navigate(['/error/server']);
    })
  }

  updateUserData(userName: string, email: string, phoneNumber: string) {
    if ((userName.trim() != "") && (email.trim() != "") && (phoneNumber.trim() != "") && (this.password.trim() != "") && (this.password2.trim() != "")) {

      this.updateError = false;

      if (this.password === this.password2) {
        this.passwordError = false;


        const updateData = {
          userId: this.userLogged.id,
          userName: userName,
          email: email,
          password: this.password,
          phoneNumber: phoneNumber,
          subscriptionDate: this.userLogged.subscriptionDate
        }

        this.password = "";
        this.password2 = "";

        this.userService.updateUser(updateData).subscribe(response => {

          if (response) {
            this.userService.getUserById(this.userLogged.id).subscribe(response => {
              if (response.length > 0) {
                this.userLogged = response[0];
                this.userService.setUserLogged(response[0]);
                this.showUpdateUser = false;
                this.router.navigate(['/user/profile']);
              }
            }, (err) => {
              this.router.navigate(['/error/server']);
            })
          }
        }, (err) => {
          if (err.status == 500) {
            this.router.navigate(['/error/server']);
          }

          if (err.status == 400) {
            this.showErrorUpdate = true;
            setTimeout(() => {
              this.showErrorUpdate = false;
            }, 3000);
          }
        })

      } else {
        this.passwordError = true;
        this.router.navigate(['/user/profile']);
      }
    } else {
      this.updateError = true;
      this.router.navigate(['/user/profile']);
    }
  }

  showForm() {
    this.showUpdateUser = true;
    this.router.navigate(['/user/profile']);
  }

  hideForm() {
    this.updateError = false;
    this.showUpdateUser = false;
    this.router.navigate(['/user/profile']);
  }

}
