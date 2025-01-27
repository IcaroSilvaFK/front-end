import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  private readonly baseUrl = 'http://localhost:8080/api';
  constructor(private http: HttpClient) { }

  private sanitazeEndpoint(endpoint: string) {
    return endpoint.startsWith("/") ? endpoint.slice(1) : endpoint;
  }

  async get<T>(endpoint: string): Promise<T> {
    const url = this.sanitazeEndpoint(endpoint);
    return firstValueFrom(this.http.get(`${this.baseUrl}/${url}`)) as Promise<T>;
  }

  async post<T>(endpoint: string, body: object): Promise<T> {
    const url = this.sanitazeEndpoint(endpoint);
    return firstValueFrom(this.http.post(`${this.baseUrl}/${url}`, body)) as Promise<T>;
  }

  async put<T>(endpoint: string, body: T): Promise<T> {
    const url = this.sanitazeEndpoint(endpoint);
    return firstValueFrom(this.http.put(`${this.baseUrl}/${url}`, body)) as Promise<T>;
  }

  async delete<T>(endpoint: string): Promise<T> {
    const url = this.sanitazeEndpoint(endpoint);
    return firstValueFrom(this.http.delete(`${this.baseUrl}/${url}`)) as Promise<T>;
  }

  async patch<T>(endpoint: string, body: T): Promise<T> {
    const url = this.sanitazeEndpoint(endpoint);
    return firstValueFrom(this.http.patch(`${this.baseUrl}/${url}`, body)) as Promise<T>;
  }
}
