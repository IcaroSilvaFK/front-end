import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PersistenceService {
  private readonly persistenceProvider = localStorage
  constructor() { }
  set(key: string, payload: unknown) {
    let result: string = payload as string
    if (typeof payload === "object") {
      result = JSON.stringify(payload)
    }
    if (typeof payload === "number") {
      result = payload.toString()
    }
    this.persistenceProvider.setItem(key, result)
  }

  get<T>(key: string, parse: boolean = true): T | null {
    const result = this.persistenceProvider.getItem(key)
    if (!result) return null
    return parse ? JSON.parse(result) : result
  }

  remove(key: string) {
    this.persistenceProvider.removeItem(key)
  }

  clear() {
    this.persistenceProvider.clear()
  }
}
