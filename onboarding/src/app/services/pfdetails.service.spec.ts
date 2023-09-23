import { TestBed } from '@angular/core/testing';

import { PfdetailsService } from './pfdetails.service';

describe('PfdetailsService', () => {
  let service: PfdetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PfdetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
