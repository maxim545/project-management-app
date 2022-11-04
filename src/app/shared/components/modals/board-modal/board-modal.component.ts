import { Component, OnInit, Inject } from '@angular/core';
import {
  FormBuilder, FormGroup, Validators, FormControl,
} from '@angular/forms';
import { IBoard } from 'src/app/core/models/board.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { snackBarGreenConfig } from 'src/app/core/configs/snackBar.configs';
import { BoardsService } from 'src/app/main/services/boards/boards.service';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IBoardDialog, IConfirmDialog } from 'src/app/core/models/modal.model';

@Component({
  selector: 'app-board-modal',
  templateUrl: './board-modal.component.html',
  styleUrls: ['./board-modal.component.scss'],
})
export class BoardModalComponent implements OnInit {
  public boardForm!: FormGroup;

  public dialogTitle: string = 'Create new board';

  public boardId: string = '';

  public boardTitle: string = '';

  public boardDescr: string = '';

  constructor(
    @Inject(MAT_DIALOG_DATA)
    private data: IBoardDialog,
    private dialogRef: MatDialogRef<BoardModalComponent>,
    public dialog: MatDialog,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private boardService: BoardsService,
  ) {
    if (data) {
      this.dialogTitle = data.dialogTitle;
      this.boardId = data.boardId;
      this.boardTitle = data.boardTitle;
      this.boardDescr = data.boardDescr;
    }
  }

  ngOnInit(): void {
    this.boardForm = this.formBuilder.group({
      title: [this.boardTitle, [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(18),
      ]],
      description: [this.boardDescr, [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(18),
      ]],
    });
  }

  get f() { return this.boardForm.controls; }

  closeDiadlog(): void {
    this.dialog.closeAll();
  }

  onSubmit() {
    if (!this.boardId) {
      this.boardService.addBoard(this.boardForm.value);
    } else {
      this.boardService.editBoard(this.boardId, this.boardForm.value);
    }
    this.dialog.closeAll();
  }
}
