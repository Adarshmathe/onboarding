import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeconfidentialadreementModelComponent } from './employeeconfidentialadreement-model.component';

describe('EmployeeconfidentialadreementModelComponent', () => {
  let component: EmployeeconfidentialadreementModelComponent;
  let fixture: ComponentFixture<EmployeeconfidentialadreementModelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeeconfidentialadreementModelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmployeeconfidentialadreementModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
