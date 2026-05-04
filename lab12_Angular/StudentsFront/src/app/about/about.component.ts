import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [DatePipe],
  template: `
    <h1>About</h1>
    <h3>Angular tutorial completed on {{ today | date: 'full' }}</h3>
  `,
})
export class AboutComponent {
  today = new Date();
}
