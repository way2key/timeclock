import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TeacherStudentService } from '../teacher-student.service';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import * as moment from 'moment/moment';

@Component({
  selector: 'app-teacher-student-time',
  templateUrl: './teacher-student-time.component.html',
  styleUrls: ['./teacher-student-time.component.scss']
})
export class TeacherStudentTimeComponent implements OnInit {
  teacher;
  students = [];
  /*timeForm = new FormGroup({
    time: new FormControl(''),
    message: new FormControl('')
  });
  defaultTime = "01:00";*/

  timeForm: FormGroup;
  choice = 0;

  motives = [
    {justification: "Oubli de timbrage"},
    {justification: "Mauvaise pause"},
    {justification: "Autre"},
  ];

  justificationText = '';



  constructor(private teacherStudentService: TeacherStudentService,
              private formBuilder: FormBuilder,
              @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.getATeacher();
    this.initForm();

    this.data.students.forEach(student => {
      if(student.isSelected) {
        this.students.push(student)
      }
    });
    this.students.sort(this.alphabeticalSort('lastname'));
  }

  initForm() {
    this.timeForm = this.formBuilder.group({
      time: '01:00',
      message: '',
    });
  }

  onSubmit(){
    let time = this.timeForm.value.time;
    let hours = moment.duration(time).asHours();
    if (this.choice === 1) {
      hours = -hours;
    }
    this.students.forEach(
      (student) => {
        this.modifyTime(hours,student);
    });

  }

  alphabeticalSort(lastname: string) {
    return function(a, b) {
      if(a[lastname] > b[lastname]) {
        return 1;
      } else if (a[lastname] < b[lastname]) {
        return -1;
      } else {
        return 0;
      }
    }
  }

  addTime() {
    this.choice = 0;
  }

  removeTime() {
    this.choice = 1;
  }

  modifyTime(hours, student) {
    const payload = {time: hours, hash:student.hash};
    return this.teacherStudentService.modifyPerformedTime(payload)
    .subscribe(
      result => {
        console.log(result)
        this.createLog(student);
      },
      error => {
        console.log(error);
      }
    );
  }

  createLog(student) {
    const payload = {
      "teacher": this.teacher.firstname + " " + this.teacher.lastname,
      "message": this.timeForm.value.message,
      "studentId": student._id,
      "operation": "Temps modifié"
    }
    this.teacherStudentService.createLog(payload)
    .subscribe(
      (result) => {
        console.log(result)
      }
    )
  }

  getATeacher(){
    this.teacherStudentService.getATeacher()
    .subscribe(
      teacher => {
        this.teacher = teacher;
    }
    )
  }

  async asyncForEach(array, callback) {
    for (let index = 0; index < array.length; index++) {
      await callback(array[index], index, array);
    }
  }
}
