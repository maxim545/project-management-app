import { Component, OnInit, OnDestroy } from '@angular/core';
import {
  FormBuilder, FormGroup, Validators, FormControl,
} from '@angular/forms';
import { Store } from '@ngrx/store';
import {
  filter, map, Observable, Subscription,
} from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth/auth.service';
import { UserState } from 'src/app/core/store/user.state';
import { MatSnackBar } from '@angular/material/snack-bar';
import { IUser } from 'src/app/core/models/user.model';
import { AuthValidators } from 'src/app/core/validators/auth.validators';
import { ApiService } from 'src/app/core/services/api/api.service';
import { snackBarGreenConfig } from 'src/app/core/configs/snackBar.configs';
import { updateUser } from 'src/app/core/store/actions/user.actions';
import { getUserStore } from '../../../core/store/selectors/user.selectors';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss'],
})
export class EditProfileComponent implements OnInit {
  public editProfileForm!: FormGroup;

  user: IUser | null = null;

  constructor(
    private store: Store,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private apiService: ApiService,
  ) { }

  ngOnInit(): void {
    this.store.select(getUserStore)
      .pipe(map(({ user }) => user))
      .subscribe((data) => { this.user = data; });

    this.editProfileForm = this.formBuilder.group({
      name: [this.user?.name, [
        Validators.required,
        Validators.minLength(6),
      ]],
      login: [this.user?.login, [
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

  get f() { return this.editProfileForm.controls; }

  updateProfile() {
    if (this.user) {
      /* delete this.editProfileForm.value.confirmPassword;
      this.apiService.updateUser(this.user.id, this.editProfileForm.value).subscribe((res) => {
        this.store.dispatch(updateUserSuccess({ user: res }));
        this.snackBar.open('Your user data has been updated', '', snackBarGreenConfig);
      }); */
      delete this.editProfileForm.value.confirmPassword;
      this.store.dispatch(updateUser({
        user: {
          id: this.user.id,
          ...this.editProfileForm.value,
        },
      }));
    }
  }
}
