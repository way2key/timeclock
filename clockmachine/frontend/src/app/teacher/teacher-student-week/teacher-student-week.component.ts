import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TeacherStudentService } from '../teacher-student.service';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';


@Component({
  selector: 'app-teacher-student-week',
  templateUrl: './teacher-student-week.component.html',
  styleUrls: ['./teacher-student-week.component.scss']
})
export class TeacherStudentWeekComponent implements OnInit {
  students;
  weeks;
  selectedWeek:string;
  teacher;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private teacherStudentService: TeacherStudentService) { }

  ngOnInit(): void {
    this.getModalData();
    this.getATeacher();
  }

  getModalData() {
    this.weeks = this.data.week;
    this.students = this.data.students;
  }

  updateStudentWeek() {
    this.students.forEach(student => {
      let payload = {weekId: this.selectedWeek, _id:student._id};
      this.teacherStudentService.updateStudentWeek(payload)
      .subscribe(
        () => {
          let payload2 = {
            "teacher": this.teacher.firstname + " " + this.teacher.lastname,
            "message": "",
            "studentId": student._id,
            "operation": "Modification d'horaire"
          };
          this.createLog(payload2);
        }
      );
    });
  }

  createLog(payload) {
    this.teacherStudentService.createLog(payload)
    .subscribe(
      result => console.log(result)
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

}
