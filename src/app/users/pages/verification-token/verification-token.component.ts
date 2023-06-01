import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ValidatorService } from 'src/app/shared/services/validator.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-verification-token',
  templateUrl: './verification-token.component.html',
  styleUrls: ['./verification-token.component.css']
})
export class VerificationTokenComponent implements OnInit {

  public verificationForm: FormGroup = this.formBuilder.group({
    token: ["", Validators.required]
  });

  public showError: boolean = false;

  private email: string = "";

  constructor(
    private formBuilder: FormBuilder,
    private validatorService: ValidatorService,
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(response => {
      this.email = response["email"];
    })
  }

  isValidField(field: string) {
    return this.validatorService.isValidField(this.verificationForm, field);
  }

  getFieldError(field: string) {
    return this.validatorService.getFieldError(this.verificationForm, field);
  }

  verifyAccount() {
    if (this.verificationForm.invalid) {
      this.verificationForm.markAllAsTouched();
      return;
    }

    const { token } = this.verificationForm.value;

    if (this.email.length > 0) {
      const updateData = {
        email: this.email,
        token
      }

      this.userService.verifyAccount(updateData).subscribe(response => {
        if (response.status === "OK") {

          this.userService.getUserById(response.id).subscribe(response => {
            if (response) {
              this.userService.setUserLogged(response);
              sessionStorage.setItem("userLogged", JSON.stringify(response));
              this.router.navigate(['/games/all']);
            }
          });
        }
      }, err => {
        if (err.status === 400) {
          this.showError = true;
        }
      });

    }
  }
}
