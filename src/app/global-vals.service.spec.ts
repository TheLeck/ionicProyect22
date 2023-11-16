import { TestBed } from '@angular/core/testing';

import { GlobalValsService } from './global-vals.service';

describe('GlobalValsService', () => {
  let service: GlobalValsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GlobalValsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
