import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store } from '@ngrx/store';
import { snackBarRedConfig } from 'src/app/core/configs/snackBar.configs';
import { ITask } from 'src/app/core/models/board.model';
import { addFile } from 'src/app/core/store/actions/files.actions';

@Injectable({
  providedIn: 'root',
})
export class FilesService {
  constructor(
    private snackBar: MatSnackBar,
    private store: Store,
  ) { }

  uploadFile(fileToUpload: File, task: ITask) {
    const re = /(?:\.([^.]+))?$/;
    const fileExtension = re.exec(fileToUpload.name)![1];
    const fileExtensions = ['png', 'jpg', 'jpeg'];
    if (!fileExtensions.includes(fileExtension)) {
      this.snackBar.open('File type must be png, jpg or jpeg', '', snackBarRedConfig);
    } else if (fileToUpload.size > 100000) {
      this.snackBar.open('File size must not exceed 100kB', '', snackBarRedConfig);
    } else {
      const formData: FormData = new FormData();
      formData.append('boardId', task.boardId);
      formData.append('taskId', task._id);
      formData.append('file', fileToUpload, fileToUpload.name);
      this.store.dispatch(addFile({ file: formData }));
    }
  }
}
