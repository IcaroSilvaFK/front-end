import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskLineComponent } from './task-line.component';

describe('TaskLineComponent', () => {
  let component: TaskLineComponent;
  let fixture: ComponentFixture<TaskLineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskLineComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaskLineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
