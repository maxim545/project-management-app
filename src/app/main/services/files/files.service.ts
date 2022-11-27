import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { select, Store } from '@ngrx/store';
import { generateId } from 'src/app/core/utils/idGenerator';
import { snackBarRedConfig } from 'src/app/core/configs/snackBar.configs';
import { ITask } from 'src/app/core/models/board.model';
import { addFile, deleteFile } from 'src/app/core/store/actions/files.actions';
import { Observable } from 'rxjs';
import { getFilesLoadingStatus } from 'src/app/core/store/selectors/files.selectors';
import { LangService } from 'src/app/core/services/lang/lang.service';
import { trnsttValues } from 'src/app/core/configs/lang';

@Injectable({
  providedIn: 'root',
})
export class FilesService {
  isLoadingFile$: Observable<boolean> = this.store.pipe(select(getFilesLoadingStatus));

  constructor(
    private snackBar: MatSnackBar,
    private store: Store,
    private langService: LangService,
  ) { }

  uploadFile(fileToUpload: File, task: ITask) {
    const re = /(?:\.([^.]+))?$/;
    const fileExtension = re.exec(fileToUpload.name)![1];
    const fileExtensions = ['png', 'jpg', 'jpeg'];
    const curLng = this.langService.getCurrentLanguage();
    if (!fileExtensions.includes(fileExtension)) {
      this.snackBar.open(trnsttValues[curLng as keyof typeof trnsttValues].file.type, '', snackBarRedConfig);
    } else if (fileToUpload.size > 100000) {
      this.snackBar.open(trnsttValues[curLng as keyof typeof trnsttValues].file.size, '', snackBarRedConfig);
    } else {
      const imgName = `${generateId()}.${fileExtension}`;
      const formData: FormData = new FormData();
      formData.append('boardId', task.boardId);
      formData.append('taskId', task._id);
      formData.append('file', fileToUpload, imgName);
      this.store.dispatch(addFile({ file: formData }));
    }
  }

  deleteFile(fileId: string) {
    this.store.dispatch(deleteFile({ fileId }));
  }
}
