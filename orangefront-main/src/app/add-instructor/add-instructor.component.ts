import { Component } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { InstructorService } from '../services/instructor.service';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatMomentDateModule, provideMomentDateAdapter } from '@angular/material-moment-adapter';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms'; // Import FormsModule



@Component({
  selector: 'app-add-instructor',
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
  templateUrl: './add-instructor.component.html',
  styleUrl: './add-instructor.component.css'
}
)

export class AddInstructorComponent {
//router: any;

constructor(private instructorService: InstructorService, private router: Router){}  

name: FormControl = new FormControl('', [Validators.required]);
email: FormControl = new FormControl('', [Validators.required, Validators.email]);
password_hash: FormControl = new FormControl('', [Validators.required]);

instructorFormGroup: FormGroup = new FormGroup({
  name: this.name,
  email: this.email,
  password_hash: this.password_hash,
});

addInstructor() {
  if (!this.instructorFormGroup.valid) {
    console.log('Data not valid');
    return;
  }

  this.instructorService.addInstructor({
    instructor_id: 0,
    name: this.name.value,
    email: this.email.value,
    password_hash: this.password_hash.value,
  }).subscribe({
  next: () => {
    console.log('Done');
    this.router.navigate(["instructor"]); // Redirect to "member" page did thid by adding a quick fixng build
  },
  error: (err) => console.error('Something went wrong: ' + err)
});
}
}
