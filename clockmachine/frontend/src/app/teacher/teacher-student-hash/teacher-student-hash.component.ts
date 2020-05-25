import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TeacherStudentService } from '../teacher-student.service';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-teacher-student-hash',
  templateUrl: './teacher-student-hash.component.html',
  styleUrls: ['./teacher-student-hash.component.scss']
})
export class TeacherStudentHashComponent implements OnInit {
  hash = new FormControl('');
  students;
  teacher;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private teacherStudentService: TeacherStudentService) { }

  ngOnInit(): void {
    this.getModalData();
  }

  updateHash(): void {
    this.students.forEach(student => {
      let payload = {
        _id: student._id,
        hash: this.hash.value
      };
      this.teacherStudentService.updateStudentHash(payload)
      .subscribe(
        () => {
          let log = {
            "teacher": this.teacher.firstname + " " + this.teacher.lastname,
            "message": "",
            "studentId": student._id,
            "operation": "Modification du hash"
          }
          this.createLog(log);
        }
      );
    });

  }

  getModalData() {
    this.students = this.data.students;
    this.teacherStudentService.getATeacher()
    .subscribe(
      teacher => {
        this.teacher = teacher;
      }
    )
  }

  createLog(payload) {
    this.teacherStudentService.createLog(payload).subscribe();
  }
}
