import { Component } from '@angular/core'; 
import { FormsModule } from '@angular/forms'; 
import { AuthService } from '../services/auth.service'; 
import { Router } from '@angular/router'; 
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({ 
  selector: 'app-login', 
  standalone: true, 
  imports: [FormsModule, CommonModule], 
  templateUrl: './login.component.html', 
  styleUrl: './login.component.css' 
}) 
export class LoginComponent {

  username!: String; 
  password!: String; 
  authenticated = false; 
  constructor(public auth: AuthService, private router: Router) {} 

  login() { 
    if (this.username != null && this.password != null) { 
      this.auth.authenticate(this.username, this.password).subscribe((auth) => { 
        if (auth != null) { 
          // Save to the local storage 
localStorage.setItem('headerValue', auth.headerValue); 
          this.authenticated = true; 
          this.router.navigate(['member']); 
        } 
      }); 
    } 
  } 

  logout(): void {
    this.auth.logout();
  }
}