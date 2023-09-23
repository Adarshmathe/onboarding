import { TestBed } from '@angular/core/testing';

import { CodeOfConductService } from './code-of-conduct.service';

describe('CodeOfConductService', () => {
  let service: CodeOfConductService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CodeOfConductService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
