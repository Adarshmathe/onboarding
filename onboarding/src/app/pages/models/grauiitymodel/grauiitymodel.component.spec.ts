import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GrauiitymodelComponent } from './grauiitymodel.component';

describe('GrauiitymodelComponent', () => {
  let component: GrauiitymodelComponent;
  let fixture: ComponentFixture<GrauiitymodelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GrauiitymodelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GrauiitymodelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
