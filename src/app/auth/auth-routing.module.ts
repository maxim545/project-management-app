import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotLoginGuard } from '../core/guards/not-login/not-login.guard';
import { EditProfileComponent } from './pages/edit-profile/edit-profile.component';
import { LoginComponent } from './pages/login/login.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [NotLoginGuard],
  },
  {
    path: 'signup',
    component: SignUpComponent,
    canActivate: [NotLoginGuard],
  },
  {
    path: 'edit-profile',
    component: EditProfileComponent,
    canActivate: [NotLoginGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule { }
