import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeConfidentialAgreementComponent } from './employee-confidential-agreement.component';

describe('EmployeeConfidentialAgreementComponent', () => {
  let component: EmployeeConfidentialAgreementComponent;
  let fixture: ComponentFixture<EmployeeConfidentialAgreementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeeConfidentialAgreementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmployeeConfidentialAgreementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
