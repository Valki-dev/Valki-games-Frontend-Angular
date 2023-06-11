import { Component } from '@angular/core';
import { User } from '../../interfaces/user.interface';
import { UserService } from '../../services/user.service';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpErrorResponse, HttpHeaderResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { ValidatorService } from 'src/app/shared/services/validator.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  registerForm: FormGroup = this.formBuilder.group({
    userName: ['', [Validators.required, Validators.minLength(4)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(4)]],
    password2: ['', [Validators.required, Validators.minLength(4)]],
    phoneNumber: ['', [Validators.required, Validators.minLength(9), Validators.maxLength(9)]]
  })
  
  public message: string = "";
  public showAlert: boolean = false;

  constructor(private userService: UserService, private formBuilder: FormBuilder, private router: Router, private validatorService: ValidatorService) { }

  getFieldError(field: string): string | null {
    return this.validatorService.getFieldError(this.registerForm, field);
  }
  
  isValidField(field: string): boolean | null {
    return this.validatorService.isValidField(this.registerForm, field);
  }

  register() {
    if (!this.registerForm.valid) {
      return
    }

    const { userName, email, password, password2, phoneNumber } = this.registerForm.value;

    if (password === password2) {
      const newUser: User = {
        id: "",
        userName: userName,
        email: email,
        password: password,
        phoneNumber: phoneNumber,
        subscriptionDate: new Date(),
        isAdmin: false,
        isVerified: false
      }

      this.userService.createUser(newUser).subscribe(response => {
        if(response) {
          this.registerForm.reset();
          this.router.navigate(['/user/login']);
        }
      }, (err) => {
        this.showAlert = true;
        this.message = "Ya existe una cuenta asociada a ese email"
        setTimeout(() => {
          this.showAlert = false;
          this.message = ""
        }, 3000);
      })
    } else {
      this.showAlert = true;
      this.message = "Las contraseñas son distintas"
      setTimeout(() => {
        this.showAlert = false;
        this.message = ""
      }, 3000);
    }
  }
}
