import { Injectable } from '@angular/core';
import { Repository } from './models/repository';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  setItem(key: string, value: any): void {
    const valueString: string = JSON.stringify(value);
    localStorage.setItem(key, valueString);
  }

  removeItem(key: string): void {
    localStorage.removeItem(key);
  }

  getRepository(repositoryId: string): Repository {
    const valueString = localStorage.getItem(repositoryId);
    return JSON.parse(valueString);
  }
}
