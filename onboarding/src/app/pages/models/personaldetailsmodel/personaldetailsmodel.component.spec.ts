import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonaldetailsmodelComponent } from './personaldetailsmodel.component';

describe('PersonaldetailsmodelComponent', () => {
  let component: PersonaldetailsmodelComponent;
  let fixture: ComponentFixture<PersonaldetailsmodelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PersonaldetailsmodelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PersonaldetailsmodelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
