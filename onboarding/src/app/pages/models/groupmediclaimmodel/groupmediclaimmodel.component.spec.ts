import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupmediclaimmodelComponent } from './groupmediclaimmodel.component';

describe('GroupmediclaimmodelComponent', () => {
  let component: GroupmediclaimmodelComponent;
  let fixture: ComponentFixture<GroupmediclaimmodelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GroupmediclaimmodelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GroupmediclaimmodelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
