import { Component, OnInit } from '@angular/core';
import { WorkoutService } from '../../services/workout.service';
import { Workout } from '../../model/workout';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import {MatTooltipModule} from '@angular/material/tooltip';

@Component({
  selector: 'app-my-workouts',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatTooltipModule, MatIconModule],
  templateUrl: './my-workouts.component.html',
  styleUrl: './my-workouts.component.css'
})
export class MyWorkoutsComponent implements OnInit {
  workouts: Workout[] = [];
  instructor_id: number;

  constructor(private workoutService: WorkoutService, private route: ActivatedRoute, private router: Router) {
    this.instructor_id = this.route.snapshot.params['instructor_id'];
  }

  ngOnInit(): void {
    this.workoutService.MyWorkouts(this.instructor_id).subscribe((workouts) => {
      this.workouts = workouts;
    });
  }
  deleteWorkout(workout_id: number) {
    console.log('Call delete function');
    this.workoutService.deleteWorkout(workout_id).subscribe();
  }

  editWorkout(workout_id: number) {
    this.router.navigate(["edit-workout", workout_id])
  }
}
