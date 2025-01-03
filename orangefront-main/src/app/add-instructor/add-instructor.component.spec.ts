import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddInstructorComponent } from './add-instructor.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('AddInstructorComponent', () => {
  let component: AddInstructorComponent;
  let fixture: ComponentFixture<AddInstructorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddInstructorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddInstructorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
