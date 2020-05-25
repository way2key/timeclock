import { Component, OnInit } from '@angular/core';
import { TeacherAuthService } from '../teacher-auth.service';
import { TeacherDashboardService } from '../teacher-dashboard.service';

@Component({
  selector: 'app-teacher-main',
  templateUrl: './teacher-main.component.html',
  styleUrls: ['./teacher-main.component.scss']
})
export class TeacherMainComponent implements OnInit {
  teacher = {
    firstname: 'Nom',
    lastname: 'Prenom'
  }

  constructor(private teacherAuthService: TeacherAuthService,
              private teacherDashboardService: TeacherDashboardService,) { }

  ngOnInit(): void {
    this.getTeacher();
  }

  logUserOut(): void {
    this.teacherAuthService.logUserOut();
  }

  getTeacher(): void {
    this.teacherDashboardService.getTeacher(localStorage.getItem('token'))
    .subscribe(
      teacher => this.teacher = teacher
    )
  }

}
