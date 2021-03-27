import { TestBed } from '@angular/core/testing';

import { OptionsService } from './options.service';

describe('OptionsService', () => {
  let service: OptionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OptionsService);
  });

  it('should be return default options', () => {
    service.getOptions().subscribe(options => {
      expect(options.pageSize).toBeGreaterThan(0);
      expect(options.theme).toContain('light');
      expect(options.sortBy).toBe('name');
      expect(options.sortOrder).toBe('asc');
    });
  });

});
