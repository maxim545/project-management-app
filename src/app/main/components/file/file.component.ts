import { Component, Input, OnInit } from '@angular/core';
import { IFile } from 'src/app/core/models/board.model';
import { FilesService } from '../../services/files/files.service';

@Component({
  selector: 'app-file',
  templateUrl: './file.component.html',
  styleUrls: ['./file.component.scss'],
})
export class FileComponent implements OnInit {
  @Input() file!: IFile;

  constructor(
    private fileService: FilesService,
  ) { }

  ngOnInit(): void {
  }

  deleteFile(file: IFile): void {
    this.fileService.deleteFile(file._id);
  }
}
