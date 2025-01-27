import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';

type CustomParams = {
  [key: string]: string | number
}


@Injectable({
  providedIn: 'root'
})
export class HttpService {
  private readonly baseUrl = import.meta.env.NG_APP_PUBLIC_BASE_API;
  constructor(private http: HttpClient) { }

  private sanitazeEndpoint(endpoint: string) {
    return endpoint.startsWith("/") ? endpoint.slice(1) : endpoint;
  }

  async get<T>(endpoint: string, params?: CustomParams): Promise<T> {
    const url = this.sanitazeEndpoint(endpoint);
    let httpParams = new HttpParams();
    if (params) {
      Object.keys(params).forEach(key => {
        httpParams = httpParams.set(key, `${params[key as keyof typeof params]}`);
      });
    }
    return firstValueFrom(this.http.get(`${this.baseUrl}/${url}`, { params: httpParams })) as Promise<T>;
  }

  async post<T>(endpoint: string, body: object, params?: HttpParams): Promise<T> {
    const url = this.sanitazeEndpoint(endpoint);
    return firstValueFrom(this.http.post(`${this.baseUrl}/${url}`, body, { params })) as Promise<T>;
  }

  async put<T>(endpoint: string, body?: T, params?: HttpParams): Promise<T> {
    const url = this.sanitazeEndpoint(endpoint);
    return firstValueFrom(this.http.put(`${this.baseUrl}/${url}`, body, { params })) as Promise<T>;
  }

  async delete<T>(endpoint: string, params?: HttpParams): Promise<T> {
    const url = this.sanitazeEndpoint(endpoint);
    return firstValueFrom(this.http.delete(`${this.baseUrl}/${url}`, { params })) as Promise<T>;
  }

  async patch<T>(endpoint: string, body: T, params?: HttpParams): Promise<T> {
    const url = this.sanitazeEndpoint(endpoint);
    return firstValueFrom(this.http.patch(`${this.baseUrl}/${url}`, body, { params })) as Promise<T>;
  }
}
