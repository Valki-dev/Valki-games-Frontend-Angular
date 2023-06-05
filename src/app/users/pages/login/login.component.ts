import { Component, EventEmitter, Output } from '@angular/core';
import { UserService } from '../../services/user.service';
import { GameService } from '../../../games/services/game.service';
import { Router } from '@angular/router';
import { User } from '../../interfaces/user.interface';
import { FormGroup, FormBuilder, Form, Validators } from '@angular/forms';
import { ValidatorService } from 'src/app/shared/services/validator.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginForm: FormGroup = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]]
  })

  public loginError: boolean = false;
  public loginErrorMessage: string = "";

  constructor(private userService: UserService, private formBuilder: FormBuilder, private router: Router, private validatorService: ValidatorService) { }

  isValidField(field: string): boolean | null {
    return this.validatorService.isValidField(this.loginForm, field);
  }

  getFieldError(field: string): string | null {
    return this.validatorService.getFieldError(this.loginForm, field);
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

        if (response.isAdmin) {
          this.userService.setIsAdmin(true);
          this.userService.setUserLogged(response);
          sessionStorage.setItem("userLogged", JSON.stringify(response));
          this.router.navigate(['/admin/dashboard'])
        } else {
          if (response.isVerified) {
            this.userService.setUserLogged(response);
            sessionStorage.setItem("userLogged", JSON.stringify(response));

            this.router.navigate(['/games/all']);
          } else {
            this.router.navigate(['/user/verification', response.email]);
          }
        }
      }

    }, (err) => {
      if (err.status == 500) {
        this.router.navigate(['/error/server']);
      }

      if (err.status == 400) {
        this.loginError = true;
        this.loginErrorMessage = "Email o contraseña incorrectos"
      }

      if (err.status == 404) {
        this.loginError = true;
        this.loginErrorMessage = "Este email no pertenece a ninguna cuenta"
      }
    });

  }
}
