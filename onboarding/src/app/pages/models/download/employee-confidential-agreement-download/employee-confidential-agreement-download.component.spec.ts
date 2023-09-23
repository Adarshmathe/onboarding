import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeConfidentialAgreementDownloadComponent } from './employee-confidential-agreement-download.component';

describe('EmployeeConfidentialAgreementDownloadComponent', () => {
  let component: EmployeeConfidentialAgreementDownloadComponent;
  let fixture: ComponentFixture<EmployeeConfidentialAgreementDownloadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeeConfidentialAgreementDownloadComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmployeeConfidentialAgreementDownloadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
