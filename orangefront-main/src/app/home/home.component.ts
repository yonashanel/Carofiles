import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { RouterLink, RouterOutlet } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MatMenuModule, FormsModule, MatToolbarModule, MatButtonModule, MatIconModule, RouterLink, RouterLink, RouterModule],  // Import RouterLink and RouterOutlet
  templateUrl: './home.component.html',
    styleUrl: './home.component.css',
})
export class HomeComponent {
  constructor(private router: Router) {}

  redirectToLogin() {
    this.router.navigate(['/login']);
  }
}

