import { Component, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Student } from '../student';
import { StudentService } from '../student.service';

@Component({
  selector: 'app-students',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './students.component.html',
  styleUrl: './students.component.css',
})
export class StudentsComponent implements OnInit {
  students = signal<Student[]>([]);

  constructor(private studentService: StudentService) {}

  ngOnInit(): void {
    this.getStudents();
  }

  getStudents(): void {
    this.studentService.getStudents().subscribe((s) => this.students.set(s));
  }

  create(index: number, firstName: string, lastName: string): void {
    this.studentService
      .createStudent(new Student(index, firstName, lastName))
      .subscribe((student) => this.students.set([...this.students(), student]));
  }

  delete(student: Student): void {
    this.students.set(this.students().filter((s) => s.id !== student.id));
    this.studentService.deleteStudent(student).subscribe();
  }
}
