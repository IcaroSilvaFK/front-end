import { Injectable } from "@angular/core";
import { HttpService } from "./http.service";

export type TaskOutput = {
  description: string
  endDate: string
  id: string
  status: string
  title: string
}
type GetAllTasksOutput = {
  tasks: TaskOutput[],
  quantityPages: number
  totalTasks: number
}

type TaskInput = {
  title: string,
  taskStatus: string,
  endDate: string,
  description: string
}


@Injectable({
  providedIn: 'root'
})
export class TasksService {
  constructor(
    private readonly httpService: HttpService
  ) { }

  async getMeTasks(page?: number, type?: string): Promise<GetAllTasksOutput> {
    return await this.httpService.get('/tasks', {
      page: page || 1,
      type: type || ""
    })
  }


  async countDoneTasks(): Promise<{ count: number }> {
    return await this.httpService.get('/tasks/done')
  }

  async createTask(task: TaskInput): Promise<TaskOutput> {
    return await this.httpService.post('/tasks', task)
  }

  async updateTask(task: TaskInput, taskId: string) {
    await this.httpService.put(`/tasks/${taskId}`, task)
  }

  async deleteTask(itemId: string) {
    await this.httpService.delete(`/tasks/${itemId}`)
  }
  async updateStatus(taskId: string, status: string) {
    await this.httpService.put(`/tasks/${taskId}/status`, { status })
  }
}
