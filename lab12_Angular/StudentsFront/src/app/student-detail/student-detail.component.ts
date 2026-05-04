import { Location, UpperCasePipe } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Student } from '../student';
import { StudentService } from '../student.service';

@Component({
  selector: 'app-student-detail',
  standalone: true,
  imports: [FormsModule, UpperCasePipe],
  templateUrl: './student-detail.component.html',
  styleUrl: './student-detail.component.css',
})
export class StudentDetailComponent implements OnInit {
  student = signal<Student | null>(null);

  constructor(
    private route: ActivatedRoute,
    private studentService: StudentService,
    private location: Location,
  ) {}

  ngOnInit(): void {
    this.getStudent();
  }

  getStudent(): void {
    const pathId = this.route.snapshot.paramMap.get('id');
    if (pathId) {
      this.studentService.getStudent(+pathId).subscribe((s) => this.student.set(s));
    }
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    const s = this.student();
    if (s) {
      this.studentService.updateStudent(s).subscribe(() => this.goBack());
    }
  }
}
