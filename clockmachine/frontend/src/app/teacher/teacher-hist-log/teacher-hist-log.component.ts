import { Component, OnInit, ViewChild } from '@angular/core';
import * as moment from 'moment';
import { TeacherHistoryService } from '../teacher-history.service.js';
import { TeacherStudentService } from '../teacher-student.service';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-teacher-hist-log',
  templateUrl: './teacher-hist-log.component.html',
  styleUrls: ['./teacher-hist-log.component.scss']
})
export class TeacherHistLogComponent implements OnInit {
  displayedColumns: string[] = ['date', 'teacher', 'message', 'operation', 'firstname', 'lastname'];
  dataSource = new MatTableDataSource();
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(private teacherHistoryService:TeacherHistoryService,
              private teacherStudentService: TeacherStudentService,) { }


  ngOnInit() {
    this.getAllLog();
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  getAllLog() {
    this.teacherHistoryService.getAllLog()
    .subscribe(
      logs => {
        this.dataSource.data = this.getStudentNames(logs);
      }
    )
  }

  getStudentNames(logs) {
    for(let log of logs) {
      let name;
      this.teacherStudentService.getAStudent(log)
      .subscribe(
        student => {
          //name = student.lastname.toUpperCase() + ' ' + student.firstname;
          log.firstname = student.firstname;
          log.lastname = student.lastname;
          //console.log(log);

        }
      )
    }
    return logs;
  }

}
