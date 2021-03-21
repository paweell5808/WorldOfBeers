import { TestBed } from '@angular/core/testing';

import { BeersService } from './beers.service';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('BeersService', () => {
  let service: BeersService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, HttpClientTestingModule],
      providers: [BeersService]
    });

    service = TestBed.inject(BeersService);
  });

});
