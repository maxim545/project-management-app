import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { ConfirmModalComponent } from './components/modals/confirm-modal/confirm-modal.component';
import { BoardModalComponent } from './components/modals/board-modal/board-modal.component';
import { ColumnModalComponent } from './components/modals/column-modal/column-modal.component';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    ConfirmModalComponent,
    BoardModalComponent,
    ColumnModalComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
  ],
})
export class SharedModule { }
