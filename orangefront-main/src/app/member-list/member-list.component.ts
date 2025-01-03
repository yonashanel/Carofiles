import { Component, OnInit } from '@angular/core';
import { Member } from '../model/member';
import { MemberComponent } from '../member/member.component';
import { MemberService } from '../services/member.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-member-list',
  standalone: true,
  imports: [MemberComponent],
  templateUrl: './member-list.component.html',
  styleUrl: './member-list.component.css'
})
export class MemberListComponent implements OnInit {

  
  constructor(private memberService: MemberService, private router: Router) {}

  ngOnInit(): void { 
    if (this.memberService.authHeader == null) { 
        this.router.navigate(["home"]); 
        return; 
    } 
    this.memberService.getMembers().subscribe((member) => { 
        this.members = member; 
    }); 
} 




  members: Member[] = [];
}
