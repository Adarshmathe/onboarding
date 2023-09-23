import { TestBed } from '@angular/core/testing';

import { EmployeeConfidentialService } from './employee-confidential.service';

describe('EmployeeConfidentialService', () => {
  let service: EmployeeConfidentialService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmployeeConfidentialService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
