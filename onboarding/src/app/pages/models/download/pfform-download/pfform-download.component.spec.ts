import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PFformDownloadComponent } from './pfform-download.component';

describe('PFformDownloadComponent', () => {
  let component: PFformDownloadComponent;
  let fixture: ComponentFixture<PFformDownloadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PFformDownloadComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PFformDownloadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
