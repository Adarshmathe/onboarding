import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FamilymodelComponent } from './familymodel.component';

describe('FamilymodelComponent', () => {
  let component: FamilymodelComponent;
  let fixture: ComponentFixture<FamilymodelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FamilymodelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FamilymodelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
