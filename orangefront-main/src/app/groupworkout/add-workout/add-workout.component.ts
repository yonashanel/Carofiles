import { Component } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { WorkoutService } from '../../services/workout.service';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatMomentDateModule, provideMomentDateAdapter } from '@angular/material-moment-adapter';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms'; // Import FormsModule



@Component({
  selector: 'app-add-workout',
  standalone: true,
  providers: [provideMomentDateAdapter(
    {
      parse: {
        dateInput: ['DD-MM-YYYY'],
      },
      display: {
      dateInput: 'DD-MM-YYYY',
      monthYearLabel: 'MMM YYYY',
      dateA11yLabel: 'LL',
      monthYearA11yLabel: 'MMMM YYYY',
    },
    },
    { useUtc: true })
    ],
  imports: [MatDatepickerModule, FormsModule, MatMomentDateModule, MatFormFieldModule, MatButtonModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule,  ],
  templateUrl: './add-workout.component.html',
  styleUrl: './add-workout.component.css'
}
)

export class AddWorkoutComponent {
//router: any;

constructor(private workoutService: WorkoutService, private router: Router){}  

workout_name: FormControl = new FormControl('', [Validators.required]);
instructor_id: FormControl = new FormControl('', [Validators.required]);
description: FormControl = new FormControl('', [Validators.required]);
duration: FormControl = new FormControl('', [Validators.required]);
capacity: FormControl = new FormControl('', [Validators.required]);

workoutFormGroup: FormGroup = new FormGroup({
  workout_name: this.workout_name,
  instructor_id: this.instructor_id,
  description: this.description,
  duration: this.duration,
  capacity: this.capacity,
});

addWorkout() {
  if (!this.workoutFormGroup.valid) {
    console.log('Data not valid');
    return;
  }

  this.workoutService.addWorkout({
    workout_id: 0,
    workout_name: this.workout_name.value,
    instructor_id: this.instructor_id.value,
    description: this.description.value,
    duration: this.duration.value,
    capacity: this.capacity.value,
  }).subscribe({
  next: () => {
    console.log('Done');
    this.router.navigate(["workout"]); // Redirect to "workout" page did thid by adding a quick fixng build
  },
  error: (err) => console.error('Something went wrong: ' + err)
});
}
}