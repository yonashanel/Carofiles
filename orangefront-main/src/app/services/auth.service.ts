import { HttpClient } from '@angular/common/http'; 
import { Injectable } from '@angular/core'; 
import { Observable } from 'rxjs'; 
import { Login } from '../model/login'; 
import { Router } from '@angular/router';


@Injectable({ 
  providedIn: 'root' 
}) 
export class AuthService {
  constructor(private router: Router, private http: HttpClient) {}
  baseUrl: string = "http://localhost:5016/api"; 

  logout(): void {
    // Clear the token or any stored authentication data
    localStorage.removeItem('headerValue');
    // Redirect to the login page
    this.router.navigate(['login']);
  }

  isLoggedIn(): boolean {
    // Check if a token exists
    return !!localStorage.getItem('headerValue');
  }

 
  authenticate(username: String, password: String): Observable<Login> { 
    return this.http.post<Login>(`${this.baseUrl}/login`, { 
      username: username, 
      password: password 
    }); 
  } 


  
}