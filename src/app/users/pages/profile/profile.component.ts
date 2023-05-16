import { Component } from '@angular/core';
import { User } from '../../interfaces/user.interface';
import { UserService } from '../../services/user.service';
import { Sale } from '../../interfaces/sale.interface';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {

  constructor(private userService: UserService, private router: Router) { }

  password: string = "";
  password2: string = "";
  passwordError: boolean = false;
  sales: Sale[] = [];
  showErrorUpdate: boolean = false;
  showUpdateUser: boolean = false;
  updateError: boolean = false;
  userLogged!: User;

  ngOnInit(): void {
    this.userLogged = this.userService.getUserLogged();
    this.getUserSales();
  }

  public deleteUser(id: string) {
    Swal.fire({
      title: `¿Seguro que quieres eliminar tu cuenta?`,
      showDenyButton: false,
      showCancelButton: true,
      confirmButtonText: 'Eliminar',
      cancelButtonText: `Cancelar`,
    }).then((result) => {
      if (result.isConfirmed) {
        this.userService.deleteUser(id).subscribe(response => {
          if (response.status === "OK") {
            this.userService.setLogged(false);
    
            const user: User = {
              id: "",
              userName: "",
              email: "",
              password: "",
              phoneNumber: "",
              subscriptionDate: new Date(),
              isAdmin: false
            }
            this.userService.setUserLogged(user);

            Swal.fire(`Tu cuenta ha sido eliminada`, '', 'success');
    
            this.router.navigate(['/games/all']);
          }
        }, (err) => {
          this.router.navigate(['/error/server']);
        })
      } else {
        this.router.navigate(['/user/profile'])
      }
    });

    
  }

  public getUserSales() {
    this.userService.getUserSales(this.userLogged.id).subscribe(response => {
      if (response) {
        this.sales = response;
      }
    }, (err) => {
      this.router.navigate(['/error/server']);
    })
  }

  public showForm() {
    this.showUpdateUser = true;
    this.router.navigate(['/user/profile']);
  }

  public hideForm() {
    this.updateError = false;
    this.showUpdateUser = false;
    this.router.navigate(['/user/profile']);
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

}
