import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth/auth.service';
import {
  FormBuilder, FormGroup, Validators, FormControl,
} from '@angular/forms';
import { Router } from '@angular/router';
import {
  Observable, BehaviorSubject, map, Subject, filter,
} from 'rxjs';
import { loginUser, loginUserSuccess } from 'src/app/core/store/actions/user.actions';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  public loginForm!: FormGroup;

  constructor(
    public authService: AuthService,
    private formBuilder: FormBuilder,
    private store: Store,
  ) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      login: ['', [
        Validators.required,
        Validators.minLength(6),
      ]],
      password: ['', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(18),
      ]],
    });
  }

  get f() { return this.loginForm.controls; }

  onSubmit() {
    this.store.dispatch(loginUserSuccess({ user: this.loginForm.value }));
  }
}
