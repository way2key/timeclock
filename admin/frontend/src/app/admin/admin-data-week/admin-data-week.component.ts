import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder} from '@angular/forms';
import { AdminDataService } from '../admin-data.service';

@Component({
  selector: 'app-admin-data-week',
  templateUrl: './admin-data-week.component.html',
  styleUrls: ['./admin-data-week.component.scss']
})
export class AdminDataWeekComponent implements OnInit {
  timeplans;
  weeks;
  weekForm = new FormGroup({
    monday: new FormControl(''),
    tuesday: new FormControl(''),
    wednesday: new FormControl(''),
    thursday: new FormControl(''),
    friday: new FormControl(''),
    saturday: new FormControl(''),
    sunday: new FormControl(''),
    name: new FormControl('')
  });
  constructor(private adminDataService:AdminDataService) { }

  ngOnInit(): void {
    this.getTimeplan();
    this.getWeek();
  }

  getTimeplan(): void {
    this.adminDataService.getTimeplan()
    .subscribe(
      timeplans => this.timeplans = timeplans
    )
  }

  getWeek(): void {
    this.adminDataService.getWeek()
    .subscribe(
      weeks => this.weeks = weeks
    )
  }

  submitWeek(): void {
    this.adminDataService.createWeek(this.weekForm.value)
    .subscribe(
      () => this.getWeek()
    );
  }

  deleteWeek(weekId): void {
    this.adminDataService.deleteWeek(weekId)
    .subscribe(
      () => this.getWeek()
    );
  }

}
