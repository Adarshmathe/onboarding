import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MediclamComponent } from './mediclam.component';

describe('MediclamComponent', () => {
  let component: MediclamComponent;
  let fixture: ComponentFixture<MediclamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MediclamComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MediclamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
