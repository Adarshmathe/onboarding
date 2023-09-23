import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NominationInPfDownloadComponent } from './nomination-in-pf-download.component';

describe('NominationInPfDownloadComponent', () => {
  let component: NominationInPfDownloadComponent;
  let fixture: ComponentFixture<NominationInPfDownloadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NominationInPfDownloadComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NominationInPfDownloadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
