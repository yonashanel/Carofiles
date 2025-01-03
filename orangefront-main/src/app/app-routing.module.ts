import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MyWorkoutsComponent } from './groupworkout/my-workouts/my-workouts.component';
import { EditWorkoutComponent } from './groupworkout/edit-workout/edit-workout.component';

const routes: Routes = [
  { path: '', redirectTo: '/my-workouts', pathMatch: 'full' },
  { path: 'my-workouts', component: MyWorkoutsComponent },
  { path: 'edit-workout/:id', component: EditWorkoutComponent },
  // Add other routes here
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }