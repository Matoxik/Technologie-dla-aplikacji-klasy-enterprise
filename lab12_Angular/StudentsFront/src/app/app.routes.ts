import { Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { StudentDetailComponent } from './student-detail/student-detail.component';
import { StudentsComponent } from './students/students.component';
export const routes: Routes = [
  { path: '', redirectTo: '/students', pathMatch: 'full' },
  { path: 'students', component: StudentsComponent },
  { path: 'student-detail/:id', component: StudentDetailComponent },
  { path: 'about', component: AboutComponent },
];
