import { Component, Input, OnInit } from '@angular/core';
import { Workout } from '../../model/workout';
import { WorkoutService } from '../../services/workout.service';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatMomentDateModule, provideMomentDateAdapter } from '@angular/material-moment-adapter';


@Component({
  selector: 'app-edit-workout',
  standalone: true,
  imports: [FormsModule, MatDatepickerModule, MatMomentDateModule, MatFormFieldModule, MatButtonModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule,],
  templateUrl: './edit-workout.component.html',
  styleUrls: ['./edit-workout.component.css']
})
export class EditWorkoutComponent implements OnInit {
  workoutId: number;
  workout?: Workout | null = null
  route: any;

  constructor(private route: ActivatedRoute, private workoutService: WorkoutService, private router: Router) {
    this.workoutId = this.route.snapshot.params['id'];
  }
  
  ngOnInit(): void {
    this.workoutService.getWorkout(this.workoutId).subscribe(workout => {
      this.workout = workout
    });
  }
   
  updateWorkout() {
    if (this.workout) {
      this.workoutService.updateWorkout(this.workout).subscribe(() => {
        this.router.navigate(["workout"])
      });
    }
  }
}