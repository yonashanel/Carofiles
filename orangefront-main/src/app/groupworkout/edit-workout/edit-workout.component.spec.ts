import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditWorkoutComponent } from './edit-workout.component';

describe('EditWorkoutComponent', () => {
  let component: EditWorkoutComponent;
  let fixture: ComponentFixture<EditWorkoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditWorkoutComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditWorkoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
