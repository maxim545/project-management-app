import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import {
  map, Observable, skipWhile, take,
} from 'rxjs';
import { IBoard, ISearchParam } from 'src/app/core/models/board.model';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ConfirmModalComponent } from 'src/app/shared/components/modals/confirm-modal/confirm-modal.component';
import { deleteBoardDialogConfig } from 'src/app/core/configs/matDialog.configs';
import { BoardModalComponent } from 'src/app/shared/components/modals/board-modal/board-modal.component';
import { BoardState } from 'src/app/core/store/reducers/boards.reducer';
import { getAllBoards } from 'src/app/core/store/selectors/boards.selectors';
import { loadBoards } from 'src/app/core/store/actions/boards.actions';
import { parseJwt } from 'src/app/core/configs/tokenParse';
import { IUser } from 'src/app/core/models/user.model';
import { getUserStore } from 'src/app/core/store/selectors/user.selectors';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BoardsService } from '../../services/boards/boards.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  boards$: Observable<IBoard[]> = this.boardStore.pipe(select(getAllBoards));

  searchFields: ISearchParam[] = [
    { id: 1, value: 'title', isSelected: true },
    { id: 2, value: 'description', isSelected: false },
    { id: 3, value: 'users', isSelected: false },
  ];

  public searchForm!: FormGroup;

  constructor(
    private store: Store,
    private dialog: MatDialog,
    private boardService: BoardsService,
    private boardStore: Store<BoardState>,
    private router: Router,
  ) {
  }

  ngOnInit(): void {
    this.searchForm = new FormGroup({
      title: new FormControl('', [
        Validators.required,
      ]),
    });
  }

  get f() {
    return this.searchForm.controls;
  }

  isAllSelected(item: ISearchParam) {
    this.searchFields.forEach((val) => {
      if (val.id === item.id) {
        val.isSelected = !val.isSelected;
      } else {
        val.isSelected = false;
      }
    });
    /* val.isSelected = val.id === item.id ? val.isSelected = !val.isSelected : val.isSelected = false */
  }

  searchTasks() {
    const selectedValue = this.searchFields.find((field) => field.isSelected)?.value || 'title';
    this.router.navigate(['search'], {
      queryParams: {
        search_query: this.searchForm.value.title,
        type: selectedValue,
      },
    });
  }

  deleteBoard(board: IBoard) {
    this.dialog.open(ConfirmModalComponent, deleteBoardDialogConfig)
      .afterClosed()
      .subscribe((isConfirmed: boolean) => {
        if (isConfirmed) {
          this.boardService.deleteBoard(board._id);
        }
      });
  }

  editBoard(board: IBoard) {
    this.dialog.open(BoardModalComponent, {
      data: {
        dialogTitle: 'headerBord.EditDord',
        board,
      },
    });
  }
}
