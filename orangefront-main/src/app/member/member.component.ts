import { Component, Input } from '@angular/core';
import { Member } from '../model/member';
import { MemberService } from '../services/member.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import {MatTooltipModule} from '@angular/material/tooltip';
import { AddMemberComponent } from '../add-member/add-member.component';

@Component({
  selector: 'app-member',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatTooltipModule, MatIconModule],
  templateUrl: './member.component.html',
  styleUrl: './member.component.css'
})
export class MemberComponent {
  @Input() member!: Member 

  constructor(private memberService: MemberService, private router: Router) {

  }

  deleteMember() {
    console.log('Call delete function');
    this.memberService.deleteMember(this.member.member_id).subscribe();
    
  }

  editMember(member_id: number) {
    this.router.navigate(["edit-member", member_id])
    
  }
  
  
}
