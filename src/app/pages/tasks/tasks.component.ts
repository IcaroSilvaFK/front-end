import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Store } from '@ngrx/store';
import { ModalNewTaskComponent } from '../../components/modal-new-task/modal-new-task.component';
import { TaskLineComponent } from '../../components/task-line/task-line.component';
import { TaskOutput, TasksService } from '../../services/tasks.service';
import { UserState } from '../../store/user/user.reducer';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    FormsModule,
    ModalNewTaskComponent,
    TaskLineComponent
  ],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.scss'
})
export class TasksComponent implements OnInit {
  tasks: TaskOutput[] = []
  titleTask = ""
  modalIsOpen = false
  doneTasks = 0
  editTask?: TaskOutput

  constructor(
    private readonly tasksService: TasksService,
    private readonly store: Store<{ user: UserState }>,
  ) { }

  async ngOnInit(): Promise<void> {
    const result = await this.tasksService.getMeTasks()
    this.tasks = result || []
    this.doneTasks = this.tasks.filter(task => task.status.toLowerCase() === "done").length
  }


  onSubmit() {
    if (!this.titleTask) return
    this.modalIsOpen = true
  }

  handleCloseModal() {
    this.modalIsOpen = false
  }

  onDeleteTask(itemId: string) {
    this.tasks = this.tasks.filter(task => task.id !== itemId)
  }
  onEditTask(taskId: string) {
    const taskToEdit = this.tasks.find(task => task.id === taskId)

    if (!taskToEdit) return

    this.modalIsOpen = true
    this.editTask = taskToEdit
  }
  createNewTask(task: TaskOutput) {
    this.tasks.push(task)
  }
  updateTask(task: TaskOutput) {
    this.tasks = this.tasks.map(item => item.id === task.id ? task : item)
    this.editTask = undefined
    this.modalIsOpen = false
  }
}
