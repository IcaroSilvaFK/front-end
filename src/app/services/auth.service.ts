import { Injectable } from '@angular/core';
import { HttpService } from './config.service';

type SignInOutput = {
  accessToken: string
  user: {
    email: string
    id: string
    username: string
  }
}

type Input = {
  email: string
  password: string
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private readonly httpService: HttpService) { }

  async signIn(input: Input): Promise<SignInOutput> {
    const response = await this.httpService.post<SignInOutput>('/auth/login', input)

    return response
  }
}
