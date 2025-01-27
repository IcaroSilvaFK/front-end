import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Store } from '@ngrx/store';
import { ModalNewTaskComponent } from '../../components/modal-new-task/modal-new-task.component';
import { TasksService } from '../../services/tasks.service';
import { UserState } from '../../store/user/user.reducer';

@Component({
    selector: 'app-tasks',
    imports: [
        MatButtonModule,
        MatIconModule,
        FormsModule,
        ModalNewTaskComponent
    ],
    templateUrl: './tasks.component.html',
    styleUrl: './tasks.component.scss'
})
export class TasksComponent implements OnInit {
  private tasks: any = []
  titleTask: string = ""

  constructor(
    private readonly tasksService: TasksService,
    private readonly store: Store<{ user: UserState }>,
  ) { }

  async ngOnInit(): Promise<void> {
    const result = await this.tasksService.getMeTasks()
    this.tasks = result
  }
}
