import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Instructor } from '../model/instructor';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InstructorService {
  get authHeader(): string { return localStorage["headerValue"]; } 
  baseUrl: string = 'http://localhost:5016/api'; 
  constructor(private httpClient: HttpClient) {
  }

  getInstructors(): Observable<Instructor[]> {
    return this.httpClient.get<Instructor[]>(this.baseUrl + "/instructor",{ 
      headers: { 
        "Authorization": this.authHeader 
  }
    });
  }

  deleteInstructor(instructor_id: number) : Observable<any> {
    return this.httpClient.delete(`${this.baseUrl}/instructor/${instructor_id}`,{ 
      headers: { 
        "Authorization": this.authHeader 
  }
    });
  }

  getInstructor(instructor_id: number) : Observable<Instructor> {
    return this.httpClient.get<Instructor>(`${this.baseUrl}/instructor/${instructor_id}`,{ 
      headers: { 
        "Authorization": this.authHeader 
  }
    });
  }

  updateInstructor(instructor: Instructor) : Observable<any> {
    return this.httpClient.put(`${this.baseUrl}/instructor`, instructor,{ 
      headers: { 
        "Authorization": this.authHeader 
  }
    });
  }
  addInstructor(instructor: Instructor) : Observable<any> {
    return this.httpClient.post(`${this.baseUrl}/instructor`, instructor,{ 
      headers: { 
        "Authorization": this.authHeader 
  }
    });
  }
}

