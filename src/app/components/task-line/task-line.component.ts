import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';

import { format, isBefore } from 'date-fns';
import { TaskOutput, TasksService } from '../../services/tasks.service';

@Component({
  selector: 'app-task-line',
  imports: [
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatTooltipModule,
    MatBadgeModule
  ],
  standalone: true,
  templateUrl: './task-line.component.html',
  styleUrl: './task-line.component.scss'
})
export class TaskLineComponent implements OnChanges {
  @Output() onDelete = new EventEmitter<void>()
  @Output() onEdit = new EventEmitter<void>()
  @Input() task!: TaskOutput
  isLoadingDelete = false
  taskStatus = ""
  isBeforeNow!: boolean
  isLoadingEditStatus = false
  private tasksRealStatus = {
    todo: "Pendente",
    inProgress: "Em Andamento",
    done: "Concluida"
  }

  constructor(
    private readonly tasksService: TasksService
  ) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['task']) {
      this.taskStatus = this.task?.status
      this.isBeforeNow = isBefore(this.task?.endDate, new Date())
    }
  }

  onEditTask() {
    this.onEdit.emit()
  }

  async onDeleteTask(itemId: string) {
    try {

      this.isLoadingDelete = true
      await this.tasksService.deleteTask(itemId)
      this.onDelete.emit()
    } catch (err) {
      console.log(err)
    } finally {
      this.isLoadingDelete = false
    }
  }

  formatDate(date: string) {
    return format(new Date(date), 'dd/MM/yyyy')
  }

  translateStatus(status: string) {
    return this.tasksRealStatus[status as keyof typeof this.tasksRealStatus]
  }

  async updateStatus(taskId: string, status: string) {
    this.isLoadingEditStatus = true
    await this.tasksService.updateStatus(taskId, status)
    this.taskStatus = status
    this.isLoadingEditStatus = false
  }
}
