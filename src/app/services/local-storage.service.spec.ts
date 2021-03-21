import { TestBed } from '@angular/core/testing';

import { LocalStorageService } from './local-storage.service';

describe('LocalStorageService', () => {
  let service: LocalStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LocalStorageService);
  });

  it('should save, write and remove string', () => {
    service.set('testValue', 'temp');
    expect(service.get('testValue')).toBe('temp');
    service.clear('testValue');
    expect(service.get('testValue')).toBeNull();
  });
});
