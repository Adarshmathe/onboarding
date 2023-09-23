import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NominationInPfComponent } from './nomination-in-pf.component';

describe('NominationInPfComponent', () => {
  let component: NominationInPfComponent;
  let fixture: ComponentFixture<NominationInPfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NominationInPfComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NominationInPfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
