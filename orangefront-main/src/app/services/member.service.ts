import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Member } from '../model/member';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class MemberService {
  get authHeader(): string { return localStorage["headerValue"]; } 
  baseUrl: string = 'http://localhost:5016/api'; 
  constructor(private httpClient: HttpClient) {
  }
 
  getMembers(): Observable<Member[]> {
   
      return this.httpClient.get<Member[]>(this.baseUrl + "/member", { 
      headers: { 
        "Authorization": this.authHeader 
  }
    }); 
  }

  deleteMember(id: number) : Observable<any> {
    return this.httpClient.delete(`${this.baseUrl}/member/${id}`
    ,{
      headers: { 
        "Authorization": this.authHeader }
    }
    );
  }

  getMember(id: number) : Observable<Member> {
    return this.httpClient.get<Member>(`${this.baseUrl}/member/${id}`,{
      headers: { 
        "Authorization": this.authHeader }
    });
  }

  updateMember(member: Member) : Observable<any> {
    return this.httpClient.put(`${this.baseUrl}/member`, member,
    {
      headers: { 
        "Authorization": this.authHeader }
    });
    
  }
  addMember(member: Member) : Observable<any> {
    return this.httpClient.post(`${this.baseUrl}/member`, member
    ,{
      headers: { 
        "Authorization": this.authHeader }
    });
    
  }
}
