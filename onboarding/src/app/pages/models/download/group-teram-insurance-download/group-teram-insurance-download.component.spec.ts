import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupTeramInsuranceDownloadComponent } from './group-teram-insurance-download.component';

describe('GroupTeramInsuranceDownloadComponent', () => {
  let component: GroupTeramInsuranceDownloadComponent;
  let fixture: ComponentFixture<GroupTeramInsuranceDownloadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GroupTeramInsuranceDownloadComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GroupTeramInsuranceDownloadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
