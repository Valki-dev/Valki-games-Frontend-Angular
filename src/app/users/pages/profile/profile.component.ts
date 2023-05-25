import { Component, OnInit } from '@angular/core';
import { User } from '../../interfaces/user.interface';
import { UserService } from '../../services/user.service';
import { Sale } from '../../interfaces/sale.interface';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidatorService } from 'src/app/shared/services/validator.service';

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

  public menuOptions!: MenuItem[];
  public passwordError: boolean = false;
  public passwordErrorMessage: string = "";
  public sales: Sale[] = [];
  public showErrorUpdate: boolean = false;
  public showProfileForm: boolean = false;
  public showUpdateUser: boolean = false;
  public updateError: boolean = false;
  public userLogged!: User | null;

  constructor(private userService: UserService, private router: Router, private formBuilder: FormBuilder, private validatorService: ValidatorService) { }

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
        command: () => this.deleteUser(this.userService.getUserLogged()!.id)
      },
    ];
    this.userDataForm.reset(this.userService.getUserLogged());
  }

  // get userLogged(): User | null {
  //   return this.userService.getUserLogged();
  // }

  isValidField(form: FormGroup, field: string): boolean | null {
    return this.validatorService.isValidField(form, field);
  }

  getFieldError(form: FormGroup, field: string): string | null {
    return this.validatorService.getFieldError(form, field);
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
            this.userService.setUserLogged(null);

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
    if (this.userService.getUserLogged() !== null) {

      this.userService.getUserSales(this.userLogged!.id).subscribe(response => {
        if (response) {
          this.sales = response;
        }
      }, (err) => {
        this.router.navigate(['/error/server']);
      });

    } else {
      this.router.navigate(["/user/login"]);
    }
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

    if (this.userService.getUserLogged() !== null) {
      const { userName, email, phoneNumber } = this.userDataForm.value;

      this.updateError = false;

      const updateData = {
        userId: this.userLogged!.id,
        userName: userName,
        email: email,
        phoneNumber: phoneNumber,
        subscriptionDate: this.userLogged!.subscriptionDate
      }

      this.userService.updateUser(updateData).subscribe(response => {

        if (response.status === "OK") {
          this.userService.getUserById(this.userLogged!.id).subscribe(response => {
            if (response) {

              this.userLogged = response;
              this.userService.setUserLogged(this.userLogged);
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
    } else {
      this.router.navigate(["/user/login"]);
    }
  }

  updatePassword() {

    if (this.passwordForm.invalid) {
      return;
    }

    if (this.userService.getUserLogged() !== null) {

      const { currentPassword, password, password2 } = this.passwordForm.value;

      if (password === password2) {
        
        this.passwordError = false;

        const compareData = {
          id: this.userLogged!.id,
          currentPassword: currentPassword
        }

        this.userService.comparePassword(compareData).subscribe(response => {
          if (response.message) {

            const updateData = {
              id: this.userLogged!.id,
              password: password
            }

            this.userService.updatePassword(updateData).subscribe(response => {
              if (response.status == "OK") {
                this.showUpdateUser = false;
                this.showProfileForm = false;
                this.passwordForm.reset();
                Swal.fire('Contraseña actualizada');
                this.router.navigate(['/user/profile']);
              }
            }, (err) => {
              if (err.status == 500) {
                this.router.navigate(['/error/server']);
              }
            });

          } else {
            this.passwordError = true;
            this.passwordErrorMessage = "Contraseña actual incorrecta"
            this.passwordForm.reset();
          }
        });

      } else {
        this.passwordError = true;
        this.passwordErrorMessage = "Las contraseñas deben ser iguales"
        this.passwordForm.reset();
      }

    } else {
      this.router.navigate(["/user/login"]);
    }
  }

}
