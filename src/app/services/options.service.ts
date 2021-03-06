import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import { DefaultOptions } from '../interfaces/default-options';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class OptionsService {
  private options = new BehaviorSubject<DefaultOptions>({
    pageSize: 15,
    theme: 'theme-light',
    sortBy: 'name',
    sortOrder: 'asc'
  });

  constructor(private storage: LocalStorageService) {
    if (this.storage.get('defaultOptions')) {
      this.setOptions(this.storage.get('defaultOptions'));
    }
  }

  getOptions(): Observable<DefaultOptions> {
    return this.options.asObservable();
  }

  setOptions(config: DefaultOptions): void {
    this.options.next(config);
    if (this.storage.get('defaultOptions') !== config) {
      this.storage.set('defaultOptions', config);
    }
  }
}
