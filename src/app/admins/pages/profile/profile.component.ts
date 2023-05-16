import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/users/interfaces/user.interface';
import { UserService } from 'src/app/users/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  public password: string = "";
  public password2: string = "";
  public passwordError: boolean = false;
  public showErrorUpdate: boolean = false;
  public showUpdateUser: boolean = false;
  public updateError: boolean = false;
  public userLogged!: User;

  constructor(private router: Router, private userService: UserService) {}

  ngOnInit(): void {
    this.userLogged = this.userService.getUserLogged();
  }

  public hideForm() {
    this.updateError = false;
    this.showUpdateUser = false;
    this.router.navigate(['/admin/profile']);
  }

  public showForm() {
    this.showUpdateUser = true;
    this.router.navigate(['/admin/profile']);
  }

  public updateUserData(userName: string, email: string, phoneNumber: string) {
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

          if (response.status === "OK") {
            this.userService.getUserById(this.userLogged.id).subscribe(response => {
              if (response) {
                this.userLogged = response;
                this.userService.setUserLogged(response);
                this.showUpdateUser = false;
                this.router.navigate(['/admin/profile']);
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
        });
      } else {
        this.passwordError = true;
        this.router.navigate(['/admin/profile']);
      }
    } else {
      this.updateError = true;
      this.router.navigate(['/admin/profile']);
    }
  }
}
