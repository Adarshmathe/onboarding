import { TestBed } from '@angular/core/testing';

import { MediclamService } from './mediclam.service';

describe('MediclamService', () => {
  let service: MediclamService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MediclamService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
