import { AbstractControl, FormGroup } from '@angular/forms';

export class AuthValidators {
  static checkPasswords(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];
      if (matchingControl.errors && !matchingControl.errors['passIsMatch']) {
        return;
      }
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ passIsMatch: true });
      } else {
        matchingControl.setErrors(null);
      }
    };
  }
}
