import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, FormBuilder} from '@angular/forms';
import { AdminDataService } from '../admin-data.service';

@Component({
  selector: 'app-admin-data-teacher',
  templateUrl: './admin-data-teacher.component.html',
  styleUrls: ['./admin-data-teacher.component.scss']
})
export class AdminDataTeacherComponent implements OnInit {
  teacherForm = new FormGroup({
    firstname: new FormControl(''),
    lastname: new FormControl(''),
    password: new FormControl('')
  })
  teachers;
  constructor(private adminDataService: AdminDataService) { }

  ngOnInit(): void {
    this.getAllTeachers();
  }

  getAllTeachers(){
    this.adminDataService.getAllTeachers()
    .subscribe(
      teachers => this.teachers = teachers
    )
  }

  createTeacher() {
    let payload = this.teacherForm.value;
    this.adminDataService.createTeacher(payload)
    .subscribe(
      () => this.getAllTeachers()
    );
  }

  deleteTeacher(teacherId) {
    this.adminDataService.deleteTeacher(teacherId)
    .subscribe(
      () => this.getAllTeachers()
    );
  }
}
