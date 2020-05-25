import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { StudentService } from '../student.service';
import * as moment from 'moment';
import 'moment-duration-format';

@Component({
  selector: 'app-student-info',
  templateUrl: './student-info.component.html',
  styleUrls: ['./student-info.component.scss']
})
export class StudentInfoComponent implements OnInit {
    message = 0;
    meal = false;
    breather = false;
    status = null;
    dayTime = null;
    student = {
    break: true,
    firstname: "Olivier",
    lastname: "Dancona",
  }

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private studentService: StudentService) { }

  ngOnInit(): void {
    this.getStatus(this.data.hash);
    this.getStudent(this.data.hash);
    this.getDayTime(this.data.hash);
    this.getMeal(this.data.hash);
    this.getBreather(this.data.hash);
  }

  getStatus(studentHash): void {
    this.studentService.getStudentStatus(studentHash).subscribe(
      status => {
        this.status = status;
      },
      error => {
        console.log(error.message);
      }
    )
  }

  getStudent(hash): void {
    this.studentService.getStudentInfo(hash).subscribe(
      student => {
        this.student = student;
        this.message = 1;
      },
      error => {
        console.log(error.message);
      }

    )
  }

  getDayTime(hash): void {
    this.studentService.getStudentDayTime(hash).subscribe(
      time => {
        this.dayTime = moment.duration(time,'h').format('HH:mm:ss');
      },
      error => {
        console.log(error.message)
      }
    )
  }

  getMeal(studentHash): void {
    this.studentService.getStudentMeal(studentHash).subscribe(
      meal => {
        this.meal = meal;
      },
      error => {
        console.log(error.message);
      }
    )
  }

  getBreather(studentHash): void {
    this.studentService.getStudentBreather(studentHash).subscribe(
      breather => {
        this.breather = breather;
      },
      error => {
        console.log(error.message);
      }
    )
  }
}
