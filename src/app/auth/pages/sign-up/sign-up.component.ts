import { Component, OnInit } from '@angular/core';
import {
  FormBuilder, FormGroup, Validators, FormControl,
} from '@angular/forms';
import { AuthService } from 'src/app/auth/services/auth/auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthValidators } from 'src/app/core/validators/auth.validators';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {
  registerForm!: FormGroup;

  constructor(
    public authService: AuthService,
    private http: HttpClient,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      name: ['', [
        Validators.required,
        Validators.minLength(6),
      ]],
      login: ['', [
        Validators.required,
        Validators.minLength(6),
      ]],
      password: ['', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(18),
      ]],
      confirmPassword: ['',
        Validators.required,
      ],
    }, {
      validator: AuthValidators.checkPasswords('password', 'confirmPassword'),
    });
  }

  get f() { return this.registerForm.controls; }

  onSubmit() {
    delete this.registerForm.value.confirmPassword;
    this.authService.signUpUser(this.registerForm.value);
  }
}
