import { Component, EventEmitter, Output } from '@angular/core';
import { UserService } from '../../services/user.service';
import { GameService } from '../../../games/services/game.service';
import { Router } from '@angular/router';
import { User } from '../../interfaces/user.interface';
import { FormGroup, FormBuilder, Form, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private userService: UserService, private formBuilder: FormBuilder, private router: Router) { }

  loginForm: FormGroup = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]]
  })

  get email() { return this.loginForm.get('email') }
  get password() { return this.loginForm.get('password') }

  loginError: boolean = false;

  isValidField(field: string): boolean | null {
    return ((this.loginForm.controls[field].errors) && (this.loginForm.controls[field].touched));
  }

  getFieldError(field: string): string | null {
    if ((!this.loginForm.controls[field]) && (!this.loginForm.controls[field].errors)) {
      return null;
    }

    const errors = this.loginForm.controls[field].errors || {};

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

  logIn() {
    if (this.loginForm.invalid) {
      return;
    }

    const { email, password } = this.loginForm.value;

    const data = {
      email: email,
      password: password
    }

    this.userService.logIn(data).subscribe(response => {
      if (response) {
        this.loginError = false;

        let user: User = response;

        //? Usar el usuario de sessionStorage en lugar del objeto?
        this.userService.setUserLogged(user);

        // sessionStorage.setItem("userLogged", JSON.stringify(response));

        this.userService.setLogged(true);

        if (response.isAdmin) {
          this.userService.setIsAdmin(true);
          this.router.navigate(['/admin/dashboard'])
        } else {
          this.router.navigate(['/games/all']);
        }
      }

    }, (err) => {
      if (err.status == 500) {
        this.router.navigate(['/error/server']);
      }

      if (err.status == 400) {
        this.loginError = true;
      }
    });

  }
}
