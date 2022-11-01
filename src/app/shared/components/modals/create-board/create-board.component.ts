import { Component, OnInit } from '@angular/core';
import {
  FormBuilder, FormGroup, Validators, FormControl,
} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { IBoard } from 'src/app/core/models/board.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { snackBarGreenConfig } from 'src/app/core/configs/snackBar.configs';
import { BoardsService } from 'src/app/main/services/boards/boards.service';

@Component({
  selector: 'app-create-board',
  templateUrl: './create-board.component.html',
  styleUrls: ['./create-board.component.scss'],
})
export class CreateBoardComponent implements OnInit {
  public boardForm!: FormGroup;

  constructor(
    public dialog: MatDialog,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private boardService: BoardsService,
  ) { }

  ngOnInit(): void {
    this.boardForm = this.formBuilder.group({
      title: ['', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(18),
      ]],
      description: ['', [
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
    this.boardService.addBoard(this.boardForm.value);
    this.boardForm.reset();
  }
}
