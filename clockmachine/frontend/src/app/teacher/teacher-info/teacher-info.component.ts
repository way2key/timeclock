import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-teacher-info',
  templateUrl: './teacher-info.component.html',
  styleUrls: ['./teacher-info.component.scss']
})
export class TeacherInfoComponent implements OnInit {

  dateUpdate = moment().format("DD/MM/YYYY");

  typeSchedule = 'Fixe'; //'Libre'

  dateBackup = moment().format("DD/MM/YYYY");

  constructor() { }

  ngOnInit(): void {
  }

  getLastBackup() {
    this.dateBackup;
  }

  getLastUpdate() {
    this.dateUpdate;
  }

  getScheduleType() {
    this.typeSchedule;
  }

}
