import { TestBed } from '@angular/core/testing';

import { NominationInPfService } from './nomination-in-pf.service';

describe('NominationInPfService', () => {
  let service: NominationInPfService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NominationInPfService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
