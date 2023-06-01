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

  constructor(private userService: UserService, private formBuilder: FormBuilder, private router: Router, private validatorService: ValidatorService) { }

  registerForm: FormGroup = this.formBuilder.group({
    userName: ['', [Validators.required, Validators.minLength(4)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(4)]],
    password2: ['', [Validators.required, Validators.minLength(4)]],
    phoneNumber: ['', [Validators.required, Validators.minLength(9), Validators.maxLength(9)]]
  })

  showAlert: boolean = false;
  message: string = "";

  isValidField(field: string): boolean | null {
    return this.validatorService.isValidField(this.registerForm, field);
    // return ((this.registerForm.controls[field].errors) && (this.registerForm.controls[field].touched));
  }

  getFieldError(field: string): string | null {
    return this.validatorService.getFieldError(this.registerForm, field);
    // if ((!this.registerForm.controls[field]) && (!this.registerForm.controls[field].errors)) {
    //   return null;
    // }

    // const errors = this.registerForm.controls[field].errors || {};

    // for (const key of Object.keys(errors)) {
    //   switch (key) {
    //     case 'required':
    //       return "Este campo es obligatorio";
    //     case 'minlength':
    //       return `Este campo debe tener ${errors['minlength'].requiredLength} caracteres como mínimo`;
    //     case 'maxlength':
    //       return `Este campo debe tener ${errors['maxlength'].requiredLength} caracteres como máximo`
    //     case 'email':
    //       return "Debes introducir un email válido";
    //   }
    // }

    // return null;
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
