import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Student } from './student';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class StudentService {
  private studentsApiUrl = 'http://localhost:5260/api/students';

  constructor(private http: HttpClient) {}

  getStudents(): Observable<Student[]> {
    return this.http.get<Student[]>(this.studentsApiUrl);
  }

  getStudent(id: number): Observable<Student> {
    return this.http.get<Student>(`${this.studentsApiUrl}/${id}`);
  }

  updateStudent(student: Student): Observable<any> {
    return this.http.put(`${this.studentsApiUrl}/${student.id}`, student, httpOptions);
  }

  createStudent(student: Student): Observable<Student> {
    return this.http.post<Student>(this.studentsApiUrl, student, httpOptions);
  }

  deleteStudent(student: Student | number): Observable<Student> {
    const id = typeof student === 'number' ? student : student.id;
    return this.http.delete<Student>(`${this.studentsApiUrl}/${id}`, httpOptions);
  }
}
