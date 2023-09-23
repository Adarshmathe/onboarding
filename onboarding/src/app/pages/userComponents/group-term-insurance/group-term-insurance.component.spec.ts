import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupTermInsuranceComponent } from './group-term-insurance.component';

describe('GroupTermInsuranceComponent', () => {
  let component: GroupTermInsuranceComponent;
  let fixture: ComponentFixture<GroupTermInsuranceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GroupTermInsuranceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GroupTermInsuranceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
