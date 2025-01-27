import { Injectable } from "@angular/core";
import { HttpService } from "./config.service";

@Injectable({
  providedIn: 'root'
})
export class TasksService {
  constructor(
    private readonly httpService: HttpService
  ) { }

  async getMeTasks() {
    return await this.httpService.get('/tasks')
  }
}
