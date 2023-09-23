import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProvidentFunddetailsmodelComponent } from './provident-funddetailsmodel.component';

describe('ProvidentFunddetailsmodelComponent', () => {
  let component: ProvidentFunddetailsmodelComponent;
  let fixture: ComponentFixture<ProvidentFunddetailsmodelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProvidentFunddetailsmodelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProvidentFunddetailsmodelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
