import { Component, OnInit, ViewChild } from '@angular/core';
import * as moment from 'moment';
import { TeacherHistoryService } from '../teacher-history.service.js';
import { TeacherStudentService } from '../teacher-student.service';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-teacher-hist-incident',
  templateUrl: './teacher-hist-incident.component.html',
  styleUrls: ['./teacher-hist-incident.component.scss']
})
export class TeacherHistIncidentComponent implements OnInit {
  displayedColumns: string[] = ['date', 'type', 'firstname', 'lastname'];
  dataSource = new MatTableDataSource();
  temporaryArray = [];
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(private teacherHistoryService:TeacherHistoryService,
              private teacherStudentService: TeacherStudentService,) { }


  ngOnInit() {
    this.getAllIncident();
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  getAllIncident() {
    this.teacherHistoryService.getAllIncident()
    .subscribe(
      incidents => {
        this.dataSource.data = this.getStudentNames(incidents);
      }
    )
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
          //console.log(incident);

        }
      )
    }
    return incidents;
  }

}
