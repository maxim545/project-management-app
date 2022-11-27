import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TranslateModule } from '@ngx-translate/core';
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
import { ProgressBarModule } from 'primeng/progressbar';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { SkeletonModule } from 'primeng/skeleton';
import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './pages/main/main.component';
import { WelcomeComponent } from './pages/welcome/welcome.component';
import { BoardComponent } from './pages/board/board.component';
import { TasksComponent } from './components/task/task.component';
import { BoardHeaderComponent } from './components/board-header/board-header.component';
import { NotFoundPageComponent } from './pages/not-found-page/not-found-page.component';
import { ColumnComponent } from './components/column/column.component';
import { PointComponent } from './components/point/point.component';
import { TaskCreaterModalComponent } from './components/task-creater-modal/task-creater-modal.component';
import { TaskModalComponent } from './components/task-modal/task-modal.component';
import { SearchComponent } from './pages/search/search.component';
import { FileComponent } from './components/file/file.component';
import { SearchFieldComponent } from './components/search-field/search-field.component';

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
    TaskCreaterModalComponent,
    TaskModalComponent,
    SearchComponent,
    FileComponent,
    SearchFieldComponent,
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
    ProgressBarModule,
    OverlayPanelModule,
    MatProgressBarModule,
    SkeletonModule,
    TranslateModule,
  ],
})
export class MainModule { }
