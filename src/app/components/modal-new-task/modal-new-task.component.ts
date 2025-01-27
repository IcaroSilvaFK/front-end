import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

interface Status {
  value: string;
  viewValue: string;
}


@Component({
  selector: 'app-modal-new-task',
  standalone: true,
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

  ],
  templateUrl: './modal-new-task.component.html',
  styleUrl: './modal-new-task.component.scss'
})

export class ModalNewTaskComponent {
  status: Status[] = [
    { value: 'todo', viewValue: 'Pendente' },
    { value: 'inProgress', viewValue: 'Em Andamento' },
    { value: 'done', viewValue: 'Concluida' },
  ]
}
