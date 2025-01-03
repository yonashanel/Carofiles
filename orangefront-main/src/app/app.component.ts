import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { InstructorComponent } from './instructor/instructor.component';
import { InstructorListComponent } from './instructor-list/instructor-list.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { FormsModule } from '@angular/forms'; // Import FormsModule
//import { LoginComponent } from './login/login.component';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [MatMenuModule, FormsModule, MatToolbarModule, MatButtonModule, MatIconModule, RouterOutlet, RouterLink ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  constructor(public auth: AuthService) {}

onLogin(arg0: any) {
throw new Error('Method not implemented.');
}
  title = 'CourseAdminSystemAngular';
loginForm: any;


logout(): void {
  this.auth.logout();
}
}
