import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup} from '@angular/forms';
import { MAT_MOMENT_DATE_FORMATS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { AdminDataService } from '../admin-data.service';
import * as _moment from 'moment/moment';

const moment = _moment;

@Component({
  selector: 'app-admin-data-holiday',
  templateUrl: './admin-data-holiday.component.html',
  styleUrls: ['./admin-data-holiday.component.scss']
})
export class AdminDataHolidayComponent implements OnInit {
  holidayForm = new FormGroup({
    startDate: new FormControl(''),
    endDate: new FormControl(''),
    title: new FormControl(''),
    allowPresence: new FormControl('')
  });
  holidays;
  choice = true;
  constructor(private adminDataService:AdminDataService) { }

  ngOnInit(): void {
    this.getHoliday();
  }

  createHoliday(): void {
    if(!this.choice){
      this.holidayForm.value.endDate = this.holidayForm.value.startDate;
    }
    let date1 = moment(this.holidayForm.value.startDate).format("YYYY/MM/DD");
    let date2 = moment(this.holidayForm.value.endDate).format("YYYY/MM/DD");
    let payload = {
      title: this.holidayForm.value.title,
      allowPresence: this.holidayForm.value.allowPresence || false,
      startDate: date1,
      endDate: date2,
    }

    this.adminDataService.createHoliday(payload)
    .subscribe(
      () => this.getHoliday()
    );
  }

  getHoliday(): void {
    this.adminDataService.getHoliday()
    .subscribe(
      holidays => {
        this.holidays = holidays;
      }
    );
  }

  deleteHoliday(holidayId): void {
    this.adminDataService.deleteHoliday(holidayId)
    .subscribe(
      () => this.getHoliday()
    )
  }

}
