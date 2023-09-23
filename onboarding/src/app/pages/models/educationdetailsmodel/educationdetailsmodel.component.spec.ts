import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EducationdetailsmodelComponent } from './educationdetailsmodel.component';

describe('EducationdetailsmodelComponent', () => {
  let component: EducationdetailsmodelComponent;
  let fixture: ComponentFixture<EducationdetailsmodelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EducationdetailsmodelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EducationdetailsmodelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
