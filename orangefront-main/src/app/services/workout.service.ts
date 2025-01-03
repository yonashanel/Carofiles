import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Workout } from '../model/workout';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WorkoutService {
  get authHeader(): string { return localStorage["headerValue"]; }
  baseUrl: string = 'http://localhost:5016/api'; 
  constructor(private httpClient: HttpClient) {
  }

  getWorkouts(): Observable<Workout[]> {
    return this.httpClient.get<Workout[]>(this.baseUrl + "/workout",{
      headers: { 
        "Authorization": this.authHeader }
    });
  }

  MyWorkouts(instructor_id: number): Observable<Workout[]> {
    return this.httpClient.get<Workout[]>(`${this.baseUrl}/workout/instructor/${instructor_id}`,{
      headers: { 
        "Authorization": this.authHeader }
    });
  }

  deleteWorkout(workout_id: number) : Observable<any> {
    return this.httpClient.delete(`${this.baseUrl}/workout/${workout_id}`, {
      headers: { 
        "Authorization": this.authHeader }
    });
  }

  getWorkout(workout_id: number) : Observable<Workout> {
    return this.httpClient.get<Workout>(`${this.baseUrl}/workout/${workout_id}`, {
      headers: { 
        "Authorization": this.authHeader }
    });
  }

  updateWorkout(workout: Workout) : Observable<any> {
    return this.httpClient.put(`${this.baseUrl}/workout`, workout, {
      headers: { 
        "Authorization": this.authHeader }
    });
  }
  addWorkout(workout: Workout) : Observable<any> {
    return this.httpClient.post(`${this.baseUrl}/workout`, workout, {
      headers: { 
        "Authorization": this.authHeader }
    });
  }
}

