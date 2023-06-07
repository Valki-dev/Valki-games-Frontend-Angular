import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidatorService {

  public isValidField(form: FormGroup, field: string) {
    return ((form.controls[field].errors) && (form.controls[field].touched));
  }

  getFieldError(form: FormGroup, field: string): string | null {
    if ((!form.controls[field]) && (!form.controls[field].errors)) {
      return null;
    }

    const errors = form.controls[field].errors || {};

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
        case 'min':
          return `Este campo debe tener un valor superior a ${errors['min'].min}`
      }
    }

    return null;
  }
 
}
