import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskCreaterModalComponent } from './task-creater-modal.component';

describe('TaskModalComponent', () => {
  let component: TaskCreaterModalComponent;
  let fixture: ComponentFixture<TaskCreaterModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TaskCreaterModalComponent],
    })
      .compileComponents();

    fixture = TestBed.createComponent(TaskCreaterModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
