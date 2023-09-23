import { TestBed } from '@angular/core/testing';

import { DownloadfilesService } from './downloadfiles.service';

describe('DownloadfilesService', () => {
  let service: DownloadfilesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DownloadfilesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
