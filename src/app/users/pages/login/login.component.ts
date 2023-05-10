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
  
  logIn() {
    const { email, password } = this.loginForm.value;
    if((email.trim() != "") && (password.trim() != "")) {
      const data = {
        email: email,
        password: password
      }

      this.userService.logIn(data).subscribe(response => {
        if(response) {
          this.loginError = false;

          let user: User = response;          
          
          //? Usar el usuario de sessionStorage en lugar del objeto?
          this.userService.setUserLogged(user);
          
          // sessionStorage.setItem("userLogged", JSON.stringify(response));

          this.userService.setLogged(true);
          
          if(response.isAdmin) {
            this.userService.setIsAdmin(true);
            this.router.navigate(['/admin/dashboard'])
          } else {
            this.router.navigate(['/games/all']);
          }
        }
          
      }, (err) => {
        if(err.status == 500) {
          this.router.navigate(['/error/server']);
        }

        if(err.status == 400) {
          this.loginError = true;
        }
      });
    }
  }
}
