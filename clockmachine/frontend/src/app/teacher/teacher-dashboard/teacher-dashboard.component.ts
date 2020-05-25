import { Component, OnInit, ViewChild } from '@angular/core';
import * as moment from 'moment';
import { TeacherDashboardService } from '../teacher-dashboard.service';
import { TeacherStudentService } from '../teacher-student.service';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-teacher-dashboard',
  templateUrl: './teacher-dashboard.component.html',
  styleUrls: ['./teacher-dashboard.component.scss']
})
export class TeacherDashboardComponent implements OnInit {
  teacher = {
    firstname: 'Nom',
    lastname: 'Prenom'
  }
  constructor(private teacherDashboardService: TeacherDashboardService,
              private teacherStudentService: TeacherStudentService,) { }

  displayedColumns: string[] = ['date', 'type', 'firstname', 'lastname', 'action'];
  dataSource = new MatTableDataSource();
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  ngOnInit(): void {
    this.getTeacher();
    this.getIncident();
    this.dataSource.sort = this.sort;
  }

  getTeacher(): void {
    this.teacherDashboardService.getTeacher(localStorage.getItem('token'))
    .subscribe(
      teacher => this.teacher = teacher
    )
  }

  getIncident(): void {
    this.teacherDashboardService.getIncident()
    .subscribe(
      incidents => {
        this.dataSource.data = this.getStudentNames(incidents);
      }
    )
  }

  checkIncident(incident): void {
    this.dataSource.data = this.dataSource.data.filter(a => a !== incident);
    this.teacherDashboardService.checkIncident(incident).subscribe();
  }

  getStudentNames(incidents) {
    for(let incident of incidents) {
      let name;
      this.teacherStudentService.getAStudent(incident)
      .subscribe(
        student => {
          //name = student.lastname.toUpperCase() + ' ' + student.firstname;
          incident.firstname = student.firstname;
          incident.lastname = student.lastname;
        }
      )
    }
    return incidents;
  }

}
