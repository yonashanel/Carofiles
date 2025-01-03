import { Routes } from '@angular/router';
import { InstructorListComponent } from './instructor-list/instructor-list.component';
import { AddInstructorComponent } from './add-instructor/add-instructor.component';
import { EditInstructorComponent } from './edit-instructor/edit-instructor.component';
import { AddMemberComponent } from './add-member/add-member.component';
import { MemberListComponent } from './member-list/member-list.component';
import { EditMemberComponent } from './edit-member/edit-member.component';
import { InstructorComponent } from './instructor/instructor.component';
import { HomeComponent } from './home/home.component';
import { MyBookingComponent } from './mybooking/mybooking.component';
import { LoginComponent } from './login/login.component';
import { BookingComponent } from './booking/booking.component';
import { AboutComponent } from './about/about.component';
import { AuthGuard } from './services/auth-guard.service';
import { WorkoutComponent } from './groupworkout/workout/workout.component'; // Ensure this path is correct and the file exists
import { WorkoutListComponent } from './groupworkout/workout-list/workout-list.component';
import { MyWorkoutsComponent } from './groupworkout/my-workouts/my-workouts.component';
import { AddWorkoutComponent } from './groupworkout/add-workout/add-workout.component';


export const routes: Routes = [
   
   { path: 'add-instructor', component: AddInstructorComponent, canActivate: [AuthGuard]},
   { path: 'edit-instructor/:instructor_id', component: EditInstructorComponent },
   { path: 'instructor', component: InstructorListComponent },
   { path: 'add-member', component: AddMemberComponent },
   { path: 'edit-member/:member_id', component: EditMemberComponent },
   { path: 'member', component: MemberListComponent, canActivate: [AuthGuard] },
   { path: 'instructor', component: InstructorComponent },
   { path: '', component: HomeComponent }, // This will be your default route
   { path: 'mybooking', component: MyBookingComponent }, 
   { path: 'booking', component: BookingComponent }, 
   { path: 'login', component: LoginComponent }, 
   { path: 'about', component: AboutComponent },
   { path: 'workout', component: WorkoutComponent }, 
   { path: 'workout', component: WorkoutListComponent },
   { path: 'add-workout', component: AddWorkoutComponent },
   { path: 'my-workout/:instructor_id', component: MyWorkoutsComponent },
   { path: 'my-workouts/:instructor_id', component: MyWorkoutsComponent },

];

