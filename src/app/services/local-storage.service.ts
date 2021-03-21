import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  set(key: string, data: any): void {
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch (error) {
      console.error('Failure saving to local storage', error);
    }
  }

  get(key: string) {
    try {
      return JSON.parse(localStorage.getItem(key));
    } catch (error) {
      console.error('Failure getting data from local Storage', error);
      return null;
    }
  }

  clear(key: string): void {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error(error);
    }
  }
}
