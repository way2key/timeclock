import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { StudentService } from '../student.service';
import { Howl, Howler } from 'howler';
import { AppRuntimeConfigurationService } from '../../app-runtime-config.service';


@Component({
  selector: 'app-student-message',
  templateUrl: './student-message.component.html',
  styleUrls: ['./student-message.component.scss']
})
export class StudentMessageComponent implements OnInit {
  message;
  status;
  student;
  error;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private studentService: StudentService, private runtimeConfiguration: AppRuntimeConfigurationService) { }

  ngOnInit() {
    this.status = this.data.status;
    this.student = this.data.student;
    this.error = this.data.error;
    this.message = this.data.message
  }

}
