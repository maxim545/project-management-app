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
import { parseJwt } from 'src/app/core/configs/tokenParse';

@Component({
  selector: 'app-board-modal',
  templateUrl: './board-modal.component.html',
  styleUrls: ['./board-modal.component.scss'],
})
export class BoardModalComponent implements OnInit {
  public boardForm!: FormGroup;

  public userId = parseJwt(localStorage.getItem('uniq_token') as string);

  public dialogTitle: string = 'Bord.form__title';

  public board: IBoard | null = null;

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
      this.board = { ...data.board };
    }
  }

  ngOnInit(): void {
    this.boardForm = this.formBuilder.group({
      title: [this.board?.title, [
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
    if (!this.board?._id) {
      console.log(42);
      this.boardService.addBoard({
        ...this.boardForm.value,
        owner: this.userId,
        users: [],
      });
    } else {
      this.boardService.editBoard(this.board._id, {
        title: this.boardForm.value.title,
        owner: this.board.owner,
        users: this.board.users,
      });
    }
    this.dialog.closeAll();
  }
}
