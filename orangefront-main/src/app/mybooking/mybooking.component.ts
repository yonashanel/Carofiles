import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-mybooking',
  standalone: true,
  templateUrl: './mybooking.component.html',
  styleUrls: ['./mybooking.component.css'],
  imports: [CommonModule],
})
export class MyBookingComponent {
  bookings = [
    {
      workout_id: 1,
      workout_name: 'Yoga Class',
      instructor_id: 101,
      discription: 'A relaxing yoga session for beginners.',
      capacity: '20',
      duration: '60 minutes',
    },
    {
      workout_id: 2,
      workout_name: 'Spinning Class',
      instructor_id: 102,
      discription: 'High-energy spinning session with great music.',
      capacity: '15',
      duration: '45 minutes',
    },
    {
      workout_id: 3,
      workout_name: 'Pilates Session',
      instructor_id: 103,
      discription: 'Core-strengthening pilates workout.',
      capacity: '10',
      duration: '50 minutes',
    },
  ];
}
