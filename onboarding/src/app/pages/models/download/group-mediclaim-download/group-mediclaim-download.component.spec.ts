import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupMediclaimDownloadComponent } from './group-mediclaim-download.component';

describe('GroupMediclaimDownloadComponent', () => {
  let component: GroupMediclaimDownloadComponent;
  let fixture: ComponentFixture<GroupMediclaimDownloadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GroupMediclaimDownloadComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GroupMediclaimDownloadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
