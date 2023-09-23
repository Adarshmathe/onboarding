import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExperiencedetailsmodelComponent } from './experiencedetailsmodel.component';

describe('ExperiencedetailsmodelComponent', () => {
  let component: ExperiencedetailsmodelComponent;
  let fixture: ComponentFixture<ExperiencedetailsmodelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExperiencedetailsmodelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExperiencedetailsmodelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
