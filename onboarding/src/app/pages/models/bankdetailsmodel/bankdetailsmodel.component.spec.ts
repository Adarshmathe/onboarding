import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BankdetailsmodelComponent } from './bankdetailsmodel.component';

describe('BankdetailsmodelComponent', () => {
  let component: BankdetailsmodelComponent;
  let fixture: ComponentFixture<BankdetailsmodelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BankdetailsmodelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BankdetailsmodelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
