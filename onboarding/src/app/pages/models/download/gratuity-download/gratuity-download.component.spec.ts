import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GratuityDownloadComponent } from './gratuity-download.component';

describe('GratuityDownloadComponent', () => {
  let component: GratuityDownloadComponent;
  let fixture: ComponentFixture<GratuityDownloadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GratuityDownloadComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GratuityDownloadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
