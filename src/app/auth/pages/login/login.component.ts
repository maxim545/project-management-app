import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth/auth.service';
import {
  FormBuilder, FormGroup, Validators, FormControl,
} from '@angular/forms';
import {
  Observable,
} from 'rxjs';
import { loginUser } from 'src/app/core/store/actions/user.actions';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  isLoadingUser$: Observable<boolean> = this.authService.isLoadingUser$;

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private store: Store,
  ) {
  }

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
    this.store.dispatch(loginUser({ user: this.loginForm.value }));
  }
}
