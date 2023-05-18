import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/users/interfaces/user.interface';
import { UserService } from 'src/app/users/services/user.service';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  public currentPassword: string = "";
  public menuOptions!: MenuItem[];
  public password: string = "";
  public password2: string = "";
  public passwordError: boolean = false;
  public showErrorUpdate: boolean = false;
  public showProfileForm: boolean = false;
  public showUpdateUser: boolean = false;
  public updateError: boolean = false;
  public userLogged!: User;

  constructor(private router: Router, private userService: UserService) {}

  ngOnInit(): void {
    this.userLogged = this.userService.getUserLogged();
    this.menuOptions = [
      {
        label: 'Editar datos',
        icon: 'pi pi-fw pi-pencil',
        command: () => this.showForm()
      },
      {
        label: 'Cambiar contraseña',
        icon: 'pi pi-fw pi-lock',
        command: () => this.showPasswordForm()
      }
    ]
  }

  public hideForm() {
    this.updateError = false;
    this.showUpdateUser = false;
    this.showProfileForm = false;
    this.router.navigate(['/admin/profile']);
  }

  public hidePasswordForm() {
    this.showUpdateUser = false;
    this.router.navigate(['/admin/profile']);
  }

  public showForm() {
    this.showUpdateUser = true;
    this.showProfileForm = true;
    this.router.navigate(['/admin/profile']);
  }

  public showPasswordForm() {
    this.showUpdateUser = true;
    this.router.navigate(['/admin/profile']);
  }

  public updatePassword() {
    if ((this.currentPassword.trim() !== "") && (this.password.trim() !== "") && (this.password2.trim() !== "")) {
      console.log(this.currentPassword);
      console.log(this.password);
      console.log(this.password2);

      const newPassword = this.password2;
      
      if (this.password === this.password2) {
        this.passwordError = false;

        const compareData = {
          id: this.userLogged.id,
          currentPassword: this.currentPassword
        }

        //* Comprueba con el backend si la contraseña actual introducida es igual a la del usuario
        this.userService.comparePassword(compareData).subscribe(response => {
          if(response.message) {
            console.log("SON IGUALES");
            //TODO: Método setear contraseña en el backend

            console.log(this.password2);
            
            const updateData = {
              id: this.userLogged.id,
              newPassword: newPassword
            }

            this.userService.updatePassword(updateData).subscribe(response => {
              if(response.status == "OK") {
                this.hidePasswordForm();
                this.router.navigate(['/admin/profile']);
              } 
            }, (err) => {
              if (err.status == 500) {
                this.router.navigate(['/error/server']);
              }
            });
          } else {
            //! Activar error en formulario
            console.log("NO LO SON");
          }

          //!Activar error contraseña actual
        })

        this.password = "";
        this.password2 = "";
      } else {
        this.passwordError = true;
        this.router.navigate(['/admin/profile']);
      }
    }
  }

  public updateUserData(userName: string, email: string, phoneNumber: string) {
    if ((userName.trim() != "") && (email.trim() != "") && (phoneNumber.trim() != "")) {

      this.updateError = false;

      const updateData = {
        userId: this.userLogged.id,
        userName: userName,
        email: email,
        phoneNumber: phoneNumber,
        subscriptionDate: this.userLogged.subscriptionDate
      }

      this.userService.updateUser(updateData).subscribe(response => {

        if (response.status === "OK") {
          this.userService.getUserById(this.userLogged.id).subscribe(response => {
            if (response) {
              this.userLogged = response;
              this.userService.setUserLogged(response);
              this.hideForm();
              this.router.navigate(['/admin/profile']);
            }
          }, (err) => {
            this.router.navigate(['/admin/server']);
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
      this.updateError = true;
      this.router.navigate(['/admin/profile']);
    }
  }

}