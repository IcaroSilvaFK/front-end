import { Component, EventEmitter, HostListener, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { TaskOutput, TasksService } from '../../services/tasks.service';
import { minDateValidator } from '../../validators/min-date.validator';

interface Status {
  value: string;
  viewValue: string;
}


@Component({
  selector: 'app-modal-new-task',
  imports: [
    MatButtonModule,
    MatDividerModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './modal-new-task.component.html',
  styleUrl: './modal-new-task.component.scss',
  standalone: true
})

export class ModalNewTaskComponent implements OnChanges {

  @Input() titleTask!: string
  @Input() taskId?: string
  @Input() task?: TaskOutput
  @Output() close = new EventEmitter<void>()
  @Output() whenItemCreated = new EventEmitter<TaskOutput>();
  @Output() whenItemUpdated = new EventEmitter<TaskOutput>();

  today = new Date();
  readonly form = new FormGroup({
    title: new FormControl("", [Validators.required, Validators.minLength(3), Validators.maxLength(100)]),
    description: new FormControl(''),
    endDate: new FormControl('', [Validators.required, minDateValidator()]),
    status: new FormControl('', [Validators.required]),
  })
  status: Status[] = [
    { value: 'todo', viewValue: 'Pendente' },
    { value: 'inProgress', viewValue: 'Em Andamento' },
    { value: 'done', viewValue: 'Concluida' },
  ]
  isLoadingSubmit = false

  constructor(
    private readonly tasksService: TasksService
  ) {

  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['titleTask']) {
      this.form.controls['title'].setValue(this.titleTask)
    }
    if (changes['task'].currentValue) {
      this.form.controls['title'].setValue(this.task?.title!)
      this.form.controls['description'].setValue(this.task?.description!)
      this.form.controls['endDate'].setValue(this.task?.endDate!)
      this.form.controls['status'].setValue(this.task?.status!)
    }
  }

  dismiss() {
    this.close.emit()
  }

  stopPropagation(event: MouseEvent) {
    event.stopPropagation();
  }

  @HostListener('document:keydown.escape', ['$event'])
  onKeydownHandler(_: KeyboardEvent) {
    this.dismiss()
  }

  async onSubmit() {
    if (!this.form.valid) return
    this.isLoadingSubmit = true
    if (this.taskId) {
      await this.tasksService.updateTask({
        title: this.form.value.title || "",
        description: this.form.value.description || "",
        endDate: this.form.value.endDate || "",
        taskStatus: this.form.value.status || "",
      }, this.taskId,)
      this.whenItemUpdated.emit({
        title: this.form.value.title || "",
        description: this.form.value.description || "",
        endDate: this.form.value.endDate || "",
        status: this.form.value.status || "",
        id: this.taskId
      })
    }
    if (!this.taskId) {
      const result = await this.tasksService.createTask({
        title: this.form.value.title || "",
        description: this.form.value.description || "",
        endDate: this.form.value.endDate || "",
        taskStatus: this.form.value.status || "",
      })
      this.whenItemCreated.emit(result)
    }

    this.form.reset()
    this.isLoadingSubmit = false
  }
}
