import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupterminsuranceModelComponent } from './groupterminsurance-model.component';

describe('GroupterminsuranceModelComponent', () => {
  let component: GroupterminsuranceModelComponent;
  let fixture: ComponentFixture<GroupterminsuranceModelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GroupterminsuranceModelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GroupterminsuranceModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
