import { Component, OnInit } from '@angular/core';
import { Workout } from '../../model/workout';
import { WorkoutComponent } from '../workout/workout.component';
import { WorkoutService } from '../../services/workout.service';

@Component({
  selector: 'app-workout-list',
  standalone: true,
  imports: [WorkoutComponent],
  templateUrl: './workout-list.component.html',
  styleUrl: './workout-list.component.css'
})
export class WorkoutListComponent implements OnInit {
  constructor(private workoutService: WorkoutService) {
  }

  ngOnInit(): void {
    this.workoutService.getWorkouts().subscribe((listOfWorkouts) => {
      this.workouts = listOfWorkouts;
    })
  }

  workouts: Workout[] = [];
}