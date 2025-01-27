import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
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
    TaskLineComponent,
    MatProgressSpinner
  ],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.scss'
})
export class TasksComponent implements OnInit {
  tasks: TaskOutput[] = []
  titleTask = ""
  modalIsOpen = false
  isLoading = false
  doneTasks = 0
  editTask?: TaskOutput
  filterType = ""
  page = 1
  quantityPages = 0
  totalTasks = 0

  constructor(
    private readonly tasksService: TasksService,
    private readonly store: Store<{ user: UserState }>,
  ) { }

  async ngOnInit(): Promise<void> {
    this.isLoading = true
    const result = await this.tasksService.getMeTasks()
    const totalDoneTasks = await this.tasksService.countDoneTasks()
    this.tasks = result.tasks || []
    this.quantityPages = result.quantityPages
    this.totalTasks = result.totalTasks
    this.doneTasks = totalDoneTasks?.count
    this.isLoading = false
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

  async changeFilterType(type: string) {
    this.isLoading = true
    this.filterType = type
    const result = await this.tasksService.getMeTasks(this.page, type)
    this.tasks = result?.tasks || []
    this.totalTasks = result?.totalTasks
    this.quantityPages = result?.quantityPages
    this.isLoading = false
  }

  async changePage(page: number) {
    try {

      this.isLoading = true
      this.page = page
      const result = await this.tasksService.getMeTasks(this.page, this.filterType)
      this.tasks = result?.tasks || []
      this.totalTasks = result?.totalTasks
      this.quantityPages = result?.quantityPages
    } catch (err) {
      console.log(err)
    } finally {
      this.isLoading = false
    }
  }
}
