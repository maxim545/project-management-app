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
  selector: 'app-create-board',
  templateUrl: './create-board.component.html',
  styleUrls: ['./create-board.component.scss'],
})
export class CreateBoardComponent implements OnInit {
  public message: string = '';

  public confirmButtonText = '';

  public cancelButtonText = '';

  public boardForm!: FormGroup;

  public boardId: string = '';

  public boardTitle: string = '';

  public boardDescr: string = '';

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: IBoardDialog,
    private dialogRef: MatDialogRef<CreateBoardComponent>,
    public dialog: MatDialog,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private boardService: BoardsService,
  ) {
    if (data && data.buttonText) {
      this.message = data.message;
      this.confirmButtonText = data.buttonText.confirm;
      this.cancelButtonText = data.buttonText.cancel;
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
