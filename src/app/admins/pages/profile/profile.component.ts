import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/users/interfaces/user.interface';
import { UserService } from 'src/app/users/services/user.service';
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

  public currentPassword: string = "";
  public menuOptions!: MenuItem[];
  public password: string = "";
  public password2: string = "";
  public passwordError: boolean = false;
  public passwordErrorMessage: string = "";
  public showErrorUpdate: boolean = false;
  public showProfileForm: boolean = false;
  public showUpdateUser: boolean = false;
  public updateError: boolean = false;
  public userLogged!: User | null;

  constructor(private router: Router, private userService: UserService, private formBuilder: FormBuilder, private validatorService: ValidatorService) {}

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
    ];
    this.userDataForm.reset(this.userService.getUserLogged());
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

  isValidField(form: FormGroup, field: string): boolean | null {
    return this.validatorService.isValidField(form, field);
  }

  getFieldError(form: FormGroup, field: string): string | null {
    return this.validatorService.getFieldError(form, field);
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
                this.router.navigate(['/admin/profile']);
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
      })
    } else {
      this.router.navigate(["/user/login"]);
    }
  }

}