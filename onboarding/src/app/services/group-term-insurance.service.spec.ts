import { TestBed } from '@angular/core/testing';

import { GroupTermInsuranceService } from './group-term-insurance.service';

describe('GroupTermInsuranceService', () => {
  let service: GroupTermInsuranceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GroupTermInsuranceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
