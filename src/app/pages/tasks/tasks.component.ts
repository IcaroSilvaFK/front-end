import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { HotToastService } from '@ngxpert/hot-toast';
import { ModalNewTaskComponent } from '../../components/modal-new-task/modal-new-task.component';
import { TaskLineComponent } from '../../components/task-line/task-line.component';
import { TaskOutput, TasksService } from '../../services/tasks.service';

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
    private toast: HotToastService,
    private cdr: ChangeDetectorRef
  ) { }

  async ngOnInit(): Promise<void> {
    try {
      this.isLoading = true
      const result = await this.tasksService.getMeTasks()
      const totalDoneTasks = await this.tasksService.countDoneTasks()
      this.tasks = result?.tasks || []
      this.quantityPages = result?.quantityPages
      this.totalTasks = result?.totalTasks || 0
      this.doneTasks = totalDoneTasks?.count || 0
    } catch (err) {
      this.toast.error("Tivemos um problema ao buscar suas tarefas, tente novamente")
    } finally {
      this.isLoading = false

    }
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
    try {

      this.isLoading = true
      this.filterType = type
      const result = await this.tasksService.getMeTasks(this.page, type)
      this.tasks = result?.tasks || []
      this.totalTasks = result?.totalTasks
      this.quantityPages = result?.quantityPages
    } catch (err) {
      this.toast.error("Tivemos um problema ao buscar suas tarefas, tente novamente")
    } finally {
      this.isLoading = false
      this.cdr.detectChanges()
    }
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
      this.toast.error("Tivemos um problema ao buscar suas tarefas, tente novamente")
    } finally {
      this.isLoading = false
      this.cdr.detectChanges()
    }
  }
}
