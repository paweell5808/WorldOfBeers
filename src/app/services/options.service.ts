import { Injectable } from '@angular/core';
import { of, from, Observable, pipe, Subject, BehaviorSubject } from 'rxjs';
import { DefaultOptions } from '../interfaces/default-options';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class OptionsService {
  private options = new BehaviorSubject<DefaultOptions>({
    pageSize: 5,
    theme: 'theme-light',
    sortBy: 'name',
    sortOrder: 'asc'
  });

  constructor(private storage: LocalStorageService) {
    if (this.storage.get('defaultOptions')) {
      this.setOptions(this.storage.get('defaultOptions'));
    }
  }

  getOptions = this.options.asObservable();

  setOptions(config: DefaultOptions): void {
    this.options.next(config);
    if (this.storage.get('defaultOptions') !== config) {
      this.storage.set('defaultOptions', config);
    }
  }
}
