import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IPoint, ITask } from 'src/app/core/models/board.model';
import { ApiService } from 'src/app/core/services/api/api.service';
import { PointsService } from '../../services/points/points.service';

@Component({
  selector: 'app-point',
  templateUrl: './point.component.html',
  styleUrls: ['./point.component.scss'],
})
export class PointComponent implements OnInit {
  @Input() public task!: ITask;

  @Input() public point!: IPoint;

  @Input() public boardId: string = '';

  public isEditMode: boolean = false;

  public editPointForm!: FormGroup;

  constructor(
    private apiService: ApiService,
    private pointsService: PointsService,
  ) { }

  ngOnInit(): void {
    this.editPointForm = new FormGroup({
      title: new FormControl(this.point.title, [
        Validators.required,
      ]),
    });
  }

  get f() {
    return this.editPointForm.controls;
  }

  editPointDoneStatus(done: boolean) {
    const updatedPoint = {
      ...this.point,
      done,
    };
    this.pointsService.editPoint(updatedPoint);
  }

  editPointTitle() {
    if (this.editPointForm.value.title !== this.point.title) {
      const updatedPoint = {
        ...this.point,
        title: this.editPointForm.value.title,
      };
      this.pointsService.editPoint(updatedPoint);
    }
  }

  deletePoint(pointId: string) {
    this.pointsService.deletePoint(pointId);
  }
}
