import { Component, Input, OnInit } from '@angular/core';
import { Member } from '../model/member';
import { MemberService } from '../services/member.service';
import { FormGroup, FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-member',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './edit-member.component.html',
  styleUrl: './edit-member.component.css'
})
export class EditMemberComponent implements OnInit {
  @Input() member_id!: number
  member?: Member | null = null
  route: any

  constructor(private memberService: MemberService, private router: Router) {}
  
  ngOnInit(): void {
    this.memberService.getMember(this.member_id).subscribe(member => {
      this.member = member
    });
  }

  updateMember() {
    if (this.member) {
      this.memberService.updateMember(this.member).subscribe(() => {
        this.router.navigate(["member"])
      });
    }
  }


  
}