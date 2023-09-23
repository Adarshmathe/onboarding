import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CodeofconductModelComponent } from './codeofconduct-model.component';

describe('CodeofconductModelComponent', () => {
  let component: CodeofconductModelComponent;
  let fixture: ComponentFixture<CodeofconductModelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CodeofconductModelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CodeofconductModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
