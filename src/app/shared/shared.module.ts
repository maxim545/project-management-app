import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { ConfirmModalComponent } from './components/modals/confirm-modal/confirm-modal.component';
import { BoardModalComponent } from './components/modals/board-modal/board-modal.component';
import { ColumnModalComponent } from './components/modals/column-modal/column-modal.component';
import { TaskModalComponent } from './components/modals/task-modal/task-modal.component';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    ConfirmModalComponent,
    BoardModalComponent,
    ColumnModalComponent,
    TaskModalComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    MatProgressBarModule,
    MatFormFieldModule,
    MatSelectModule,
    MatSlideToggleModule,
    TranslateModule,
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
  ],
})
export class SharedModule { }
