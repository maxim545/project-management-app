import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { ConfirmModalComponent } from './components/modals/confirm-modal/confirm-modal.component';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    ConfirmModalComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
  ],
})
export class SharedModule { }
