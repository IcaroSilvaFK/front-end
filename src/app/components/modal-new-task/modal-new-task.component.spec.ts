import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalNewTaskComponent } from './modal-new-task.component';

describe('ModalNewTaskComponent', () => {
  let component: ModalNewTaskComponent;
  let fixture: ComponentFixture<ModalNewTaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalNewTaskComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalNewTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
