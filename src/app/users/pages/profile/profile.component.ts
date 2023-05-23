import { Component, OnInit } from '@angular/core';
import { User } from '../../interfaces/user.interface';
import { UserService } from '../../services/user.service';
import { Sale } from '../../interfaces/sale.interface';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  public userDataForm: FormGroup = this.formBuilder.group({
    userName: ['', [Validators.required, Validators.minLength(4)]],
    email: ['', [Validators.required, Validators.email]],
    phoneNumber: ['', [Validators.required, Validators.minLength(9), Validators.maxLength(9)]]
  });

  public passwordForm: FormGroup = this.formBuilder.group({
    currentPassword: ['', Validators.required],
    password: ['', [Validators.required, Validators.minLength(4)]],
    password2: ['', Validators.required]
  });

  constructor(private userService: UserService, private router: Router, private formBuilder: FormBuilder) { }

  public currentPassword: string = "";
  public menuOptions!: MenuItem[];
  public password: string = "";
  public password2: string = "";
  public passwordError: boolean = false;
  public sales: Sale[] = [];
  public showErrorUpdate: boolean = false;
  public showProfileForm: boolean = false;
  public showUpdateUser: boolean = false;
  public updateError: boolean = false;
  public userLogged!: User;

  ngOnInit(): void {
    this.userLogged = this.userService.getUserLogged();
    this.getUserSales();
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
      },
      {
        label: 'Eliminar cuenta',
        icon: 'pi pi-fw pi-trash',
        command: () => this.deleteUser(this.userLogged.id)
      },
    ];
    this.userDataForm.reset(this.userLogged);
  }

  isValidField(form: FormGroup, field: string): boolean | null {
    return ((form.controls[field].errors) && (form.controls[field].touched));
  }

  getFieldError(form: FormGroup, field: string): string | null {
    if ((!form.controls[field]) && (!form.controls[field].errors)) {
      return null;
    }

    const errors = this.userDataForm.controls[field].errors || {};

    for (const key of Object.keys(errors)) {
      switch (key) {
        case 'required':
          return "Este campo es obligatorio";
        case 'minlength':
          return `Este campo debe tener ${errors['minlength'].requiredLength} caracteres como mínimo`;
        case 'maxlength':
          return `Este campo debe tener ${errors['maxlength'].requiredLength} caracteres como máximo`
        case 'email':
          return "Debes introducir un email válido";
      }
    }

    return null;
  }

  deleteUser(id: string) {
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

  getUserSales() {
    this.userService.getUserSales(this.userLogged.id).subscribe(response => {
      if (response) {
        this.sales = response;
      }
    }, (err) => {
      this.router.navigate(['/error/server']);
    })
  }

  showForm() {
    this.showUpdateUser = true;
    this.showProfileForm = true;
    this.router.navigate(['/user/profile']);
  }

  showPasswordForm() {
    this.showUpdateUser = true;
    this.router.navigate(['/user/profile']);
  }

  hideForm() {
    this.updateError = false;
    this.showUpdateUser = false;
    this.showProfileForm = false;
    this.router.navigate(['/user/profile']);
  }

  hidePasswordForm() {
    this.showUpdateUser = false;
    this.router.navigate(['/user/profile']);
  }

  updateUserData() {
    if (this.userDataForm.invalid) {
      return;
    }

    const { userName, email, phoneNumber } = this.userDataForm.value;

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
            this.showUpdateUser = false;
            this.showProfileForm = false;
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
  }

  updatePassword() {
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
          if (response.message) {
            console.log("SON IGUALES");
            //TODO: Método setear contraseña en el backend

            console.log(this.password2);

            const updateData = {
              id: this.userLogged.id,
              newPassword: newPassword
            }

            this.userService.updatePassword(updateData).subscribe(response => {
              if (response.status == "OK") {
                this.showUpdateUser = false;
                this.router.navigate(['/user/profile']);
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
        this.router.navigate(['/user/profile']);
      }
    }
  }

}
