import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MultiSelectModule } from 'primeng/multiselect';
import { PanelMenuModule } from 'primeng/panelmenu';
import { ButtonModule } from 'primeng/button';
import { AccordionModule } from 'primeng/accordion';
import { ToastModule } from 'primeng/toast';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './pages/main/main.component';
import { WelcomeComponent } from './pages/welcome/welcome.component';
import { BoardComponent } from './pages/board/board.component';
import { TasksComponent } from './components/task/task.component';
import { BoardHeaderComponent } from './components/board-header/board-header.component';
import { NotFoundPageComponent } from './pages/not-found-page/not-found-page.component';
import { ColumnComponent } from './components/column/column.component';
import { PointComponent } from './components/point/point.component';

@NgModule({
  declarations: [
    MainComponent,
    WelcomeComponent,
    BoardComponent,
    TasksComponent,
    BoardHeaderComponent,
    NotFoundPageComponent,
    ColumnComponent,
    PointComponent,
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    DragDropModule,
    MatIconModule,
    MatSelectModule,
    MultiSelectModule,
    PanelMenuModule,
    /*  AccordionModule,
    ButtonModule,
    ToastModule, */
    MatExpansionModule,
    MatCheckboxModule,
  ],
})
export class MainModule { }
