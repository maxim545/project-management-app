import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginGuard } from '../core/guards/login/login.guard';
import { NotLoginGuard } from '../core/guards/not-login/not-login.guard';
import { BoardComponent } from './pages/board/board.component';
import { MainComponent } from './pages/main/main.component';
import { WelcomeComponent } from './pages/welcome/welcome.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'main',
    pathMatch: 'full',
  },
  {
    path: 'main',
    component: MainComponent,
    canActivate: [LoginGuard],
  },
  {
    path: 'board/:id',
    component: BoardComponent,
    canActivate: [LoginGuard],
  },
  {
    path: 'welcome',
    component: WelcomeComponent,
    canActivate: [NotLoginGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainRoutingModule { }
