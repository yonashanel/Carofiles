import { Component, Input, OnInit } from '@angular/core';
import { Instructor } from '../model/instructor';
import { InstructorService } from '../services/instructor.service';
import { Router, RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import {MatTooltipModule} from '@angular/material/tooltip';
import { MyWorkoutsComponent } from '../groupworkout/my-workouts/my-workouts.component';

@Component({
  selector: 'app-instructor',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatTooltipModule, MatIconModule, MyWorkoutsComponent, RouterModule],
  templateUrl: './instructor.component.html',
  styleUrl: './instructor.component.css'
})
export class InstructorComponent {
  @Input() instructor!: Instructor 

  constructor(private instructorService: InstructorService, private router: Router) {

  }

  deleteInstructor() {
    console.log('Call delete function');
    this.instructorService.deleteInstructor(this.instructor.instructor_id).subscribe();
  }

  editInstructor(instructor_id: number) {
    this.router.navigate(["edit-instructor", instructor_id])
  }
}
