import { Component } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MemberService } from '../services/member.service';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatMomentDateModule, provideMomentDateAdapter } from '@angular/material-moment-adapter';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-member',
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
  imports: [MatDatepickerModule, MatMomentDateModule, MatFormFieldModule, MatButtonModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule,  ],
  templateUrl: './add-member.component.html',
  styleUrl: './add-member.component.css'
})
export class AddMemberComponent {


constructor(private memberService: MemberService, private router: Router){}  

name: FormControl = new FormControl('', [Validators.required]);
email: FormControl = new FormControl('', [Validators.required, Validators.email]);
password_hash: FormControl = new FormControl('', [Validators.required]);

memberFormGroup: FormGroup = new FormGroup({
  name: this.name,
  email: this.email,
  password_hash: this.password_hash,
});

addMember() {
  if (!this.memberFormGroup.valid) {
    console.log('Data not valid');
    return;
  }
  this.memberService.addMember({
    member_id: 0,
    name: this.name.value,
    email: this.email.value,
    password_hash: this.password_hash.value,
  }).subscribe({
    next: () => {
      console.log('Done');
      this.router.navigate(["member"]); // Redirect to "member" page did thid by adding a quick fixng build
    },
    error: (err) => console.error('Something went wrong: ' + err)
  })

}


}