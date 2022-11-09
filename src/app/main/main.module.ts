import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './pages/main/main.component';
import { WelcomeComponent } from './pages/welcome/welcome.component';
import { BoardComponent } from './pages/board/board.component';
import { ColumnsComponent } from './components/columns/columns.component';
import { SingleColumnComponent } from './components/single-column/single-column.component';
import { TasksComponent } from './components/tasks/tasks.component';
import { BoardHeaderComponent } from './components/board-header/board-header.component';
import { NotFoundPageComponent } from './pages/not-found-page/not-found-page.component';

@NgModule({
  declarations: [
    MainComponent,
    WelcomeComponent,
    BoardComponent,
    ColumnsComponent,
    SingleColumnComponent,
    TasksComponent,
    BoardHeaderComponent,
    NotFoundPageComponent,
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    DragDropModule,
  ],
})
export class MainModule { }
