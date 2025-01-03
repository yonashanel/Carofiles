import { Component, Input, OnInit } from '@angular/core';
import { Workout } from '../../model/workout';
import { WorkoutService } from '../../services/workout.service';
import { Router, RouterModule, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import {MatTooltipModule} from '@angular/material/tooltip';

@Component({
  selector: 'app-workout',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatTooltipModule, MatIconModule],
  templateUrl: './workout.component.html',
  styleUrl: './workout.component.css'
})
export class WorkoutComponent {
  @Input() workout!: Workout 

  constructor(private workoutService: WorkoutService, private router: Router) {

  }

  deleteWorkout() {
    console.log('Call delete function');
    this.workoutService.deleteWorkout(this.workout.workout_id).subscribe();
  }

  editWorkout(workout_id: number) {
    this.router.navigate(["edit-workout", workout_id])
  }
}