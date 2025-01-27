import { Injectable } from '@angular/core';
import { HttpService } from './config.service';

type UserInput = {
  email: string,
  password: string,
  username: string
}

type UserOutput = {
  email: string
  id: string
  username: string
}

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private readonly httpService: HttpService) { }

  async createUser(user: UserInput): Promise<UserOutput> {
    const response = await this.httpService.post<UserOutput>('/users', user);

    return response
  }
}
