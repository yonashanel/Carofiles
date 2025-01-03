import { Component, OnInit } from '@angular/core';
import { Instructor } from '../model/instructor';
import { InstructorComponent } from '../instructor/instructor.component';
import { InstructorService } from '../services/instructor.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-instructor-list',
  standalone: true,
  imports: [InstructorComponent  ],
  templateUrl: './instructor-list.component.html',
  styleUrl: './instructor-list.component.css'
})
export class InstructorListComponent implements OnInit {
  
  constructor(private instructorService: InstructorService, private router: Router) {
  }

  
  ngOnInit(): void { 
    if (this.instructorService.authHeader == null) { 
        this.router.navigate(["home"]); 
        return; 
    } 
    this.instructorService.getInstructors().subscribe((listOfInstructors) => { 
      this.instructors = listOfInstructors;
    }); 
} 

  instructors: Instructor[] = [];
}
