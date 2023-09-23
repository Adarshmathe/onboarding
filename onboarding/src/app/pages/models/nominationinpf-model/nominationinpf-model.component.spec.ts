import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NominationinpfModelComponent } from './nominationinpf-model.component';

describe('NominationinpfModelComponent', () => {
  let component: NominationinpfModelComponent;
  let fixture: ComponentFixture<NominationinpfModelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NominationinpfModelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NominationinpfModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
