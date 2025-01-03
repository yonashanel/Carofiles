import { Component, Input, OnInit } from '@angular/core';
import { Instructor } from '../model/instructor';
import { InstructorService } from '../services/instructor.service';
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
  selector: 'app-edit-instructor',
  standalone: true,
  imports: [FormsModule, MatDatepickerModule, MatMomentDateModule, MatFormFieldModule, MatButtonModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule,],
  templateUrl: './edit-instructor.component.html',
  styleUrl: './edit-instructor.component.css'
})
export class EditInstructorComponent implements OnInit {
  @Input() instructor_id!: number;
  instructor?: Instructor | null = null
//name: any;
  route: any;

  constructor(private instructorService: InstructorService, private router: Router) {}
  
  ngOnInit(): void {
    this.instructorService.getInstructor(this.instructor_id).subscribe(instructor => {
      this.instructor = instructor
    });
  }
   
  updateInstructor() {
    if (this.instructor) {
      this.instructorService.updateInstructor(this.instructor).subscribe(() => {
        this.router.navigate(["instructor"])
      });
    }
  }
}
