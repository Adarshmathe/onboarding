import { TestBed } from '@angular/core/testing';

import { AlertBoxServiceService } from './alert-box-service.service';

describe('AlertBoxServiceService', () => {
  let service: AlertBoxServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AlertBoxServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
