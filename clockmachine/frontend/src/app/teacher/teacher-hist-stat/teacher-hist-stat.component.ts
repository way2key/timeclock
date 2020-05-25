import { Component, OnInit, OnDestroy } from '@angular/core';
import { TeacherStudentService } from '../teacher-student.service';
import { TeacherHistoryService } from '../teacher-history.service';
import { StudentService } from '../../student/student.service';
import { FormGroup, FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import * as p5 from 'p5';
import * as moment from 'moment/moment';

@Component({
  selector: 'app-teacher-hist-stat',
  templateUrl: './teacher-hist-stat.component.html',
  styleUrls: ['./teacher-hist-stat.component.scss']
})
export class TeacherHistStatComponent implements OnInit {
  students = [];
  options;
  shownStudents = [];
  sortCriteria = new FormControl('alphabetical');
  dayPerformedTime = 0;
  myControlSearch = new FormControl();
  filteredOptions: Observable<string[]>;
  canvas: any;
  time;
  clock = [];
  clocksExist = true;
  date = new FormControl(moment());
  calendarFilter = (d: moment.Moment): boolean => {
    const day = d.day();
    // Prevent Saturday and Sunday from being selected.
    return d <= moment() && day !== 0;
  }

  constructor(private teacherStudentService: TeacherStudentService,
              private teacherHistoryService:TeacherHistoryService,
              private studentService: StudentService) { }

  ngOnInit(): void {
    this.getStudents();
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }

  getStudents(): void {
    this.students = [];
    this.teacherStudentService.getAllStudents()
    .subscribe((dbStudents) => {
      this.students = dbStudents;
      this.students.sort(this.sortOrder());
      this.shownStudents = this.students;
      this.autocompleteFill();
      this.filteredOptions = this.myControlSearch.valueChanges
      .pipe(
        startWith(''),
        map((value) => {
          this.shownStudents = [];
          let studentNames = this._filter(value);
          studentNames.forEach(studentName => {
            this.students.forEach(student => {
              if(studentName === (student.firstname + ' ' + student.lastname)){
                this.shownStudents.push(student);
              };
            })
          });
          return studentNames;
        })
      );
    });
  }

  dateSelect(hash) {
    this.getStudentClock(hash);

    //Chercher timeline correspondant à la date sélectionnée
  }

  clearSearchField() {
    this.myControlSearch = new FormControl();
    this.getStudents();
  }

  autocompleteFill() {
    this.options = [];
    for(let student of this.students) {
      let name = student.firstname + ' ' + student.lastname;
      this.options.push(name);
    }
  }

  sortOrder() {
    if (this.sortCriteria.value === 'alphabetical') {
      return this.alphabeticalSort();
    } else if (this.sortCriteria.value === 'unAlphabetical') {
      return this.unAlphabeticalSort();
    } else if (this.sortCriteria.value === 'lowToHigh') {
      return this.lowToHighSort();
    } else if (this.sortCriteria.value === 'highToLow') {
      return this.highToLowSort();
    }
  }

  alphabeticalSort() {
    let lastname = 'lastname';
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

  unAlphabeticalSort() {
    let lastname = 'lastname';
    return function(a, b) {
      if(a[lastname] < b[lastname]) {
        return 1;
      } else if (a[lastname] > b[lastname]) {
        return -1;
      } else {
        return 0;
      }
    }
  }

  lowToHighSort() {
    let performedTime = 'performedTime';
    return function(a, b) {
      if(a[performedTime] > b[performedTime]) {
        return 1;
      } else if (a[performedTime] < b[performedTime]) {
        return -1;
      } else {
        return 0;
      }
    }
  }

  highToLowSort() {
    let performedTime = 'performedTime';
    return function(a, b) {
      if(a[performedTime] > b[performedTime]) {
        return -1;
      } else if (a[performedTime] < b[performedTime]) {
        return 1;
      } else {
        return 0;
      }
    }
  }

  reloadStudents() {
    this.getStudents();
    this.shownStudents.sort(this.sortOrder());
  }

  getStudentClock(hash){
    this.stopTimeline();
    const payload = {
      hash: hash,
      date:  this.date.value.format('YYYY/MM/DD'),
    }

    this.teacherHistoryService.getStudentClocksSpecificDay(payload).subscribe(
      clocks => {
        console.log(clocks);

        this.clocksExist = true;
        this.clock = clocks;
        this.drawTimeLine(hash);
      },
      error => {
        //this.clocksExist = false;
        this.stopTimeline();
        console.log(error.message);
      }
    )

    this.teacherHistoryService.getStudentDayTime(payload).subscribe(
      time => {
        this.dayPerformedTime = time;
      },
      error => {
        console.log(error.message);
      }
    )
  }

  getStudentTimeline(hash: string, date) {
    this.getStudentClock(hash);

  }

  drawTimeLine(hash: string) {
    const sketch = s => {
      var x_start;
      var x_end;
      var lowerBound;
      var upperBound;
      var y;

      s.setup = () => {
        s.createCanvas(600,300).parent(hash);
        x_start = 0.1*s.width;
        x_end = 0.9*s.width;
        y = 0.8*s.height;
      }

      s.draw = () => {
        this.time = moment.duration(moment().format('HH:mm:ss'));
        let range = this.clock[this.clock.length-1]-this.clock[0];
        if(range < 3) {
          range = 3;
        }

        let margin;
        if(range){
          margin = 0.2*range;
        }else{
          margin = 0.1*this.clock[0];
        }

        lowerBound = this.clock[0]-margin;
        upperBound = this.clock[this.clock.length-1]+margin;
        s.clear();

        // Baseline
        s.strokeWeight(4);
        s.stroke(0);
        let baseline = s.line(x_start, y, x_end, y);

        // Timeline
        if(this.date.value.format('YYYY/MM/DD') === moment().format('YYYY/MM/DD')) {
          upperBound = upperBound = this.time.asHours()+margin;

          s.fill(0,255,0);
          s.stroke(0);
          let x_time = s.map(this.time.asHours(),lowerBound,upperBound,x_start,x_end);

          s.strokeWeight(4);
          let timeline = s.line(x_time,0.85*s.height,x_time,0.34*s.height);

          // Timeline Hour
          s.fill(230);
          s.noStroke(0);
          s.textSize(0.05*s.height);
          s.textAlign(s.CENTER);
          s.text(this.time.format('HH:mm:ss'), x_time, 0.3*s.height);
        }

        // Graduation
        s.strokeWeight(2);
        let max = s.ceil(this.clock[this.clock.length-1]);
        let r = max+1;

        while(r > lowerBound){
          let x = s.map(r,lowerBound,upperBound,x_start,x_end);
          s.stroke(0);
          s.line(x,y,x,0.82*s.height);
          // Time
          s.noStroke(0);
          s.fill(230);
          s.textSize(0.03*s.height);
          s.textAlign(s.CENTER);
          s.text(r+':00', x, 0.85*s.height);
          r--;
        }

        // Completed period
        for(let i=0; i < this.clock.length; i+=2){
          s.fill(0,255,0,140);
          s.strokeWeight(3);
          s.stroke(0);
          s.rect(s.map(this.clock[i],lowerBound,upperBound,x_start,x_end), y, s.map(this.clock[i+1],lowerBound,upperBound,x_start,x_end)-s.map(this.clock[i],lowerBound,upperBound,x_start,x_end), -0.17*s.height);
        }

        // last period
        if(this.clock.length %2!=0){
          s.fill(250,255,0,175);
          let index = this.clock.length - 1;
          let x_time = s.map(this.time.asHours(),lowerBound,upperBound,x_start,x_end);

          s.rect(
            s.map(this.clock[index],lowerBound,upperBound,x_start,x_end),
            y,
            s.map(this.time.asHours(),lowerBound,upperBound,x_start,x_end)-s.map(this.clock[index],lowerBound,upperBound,x_start,x_end),
            -0.17*s.height
          );
        }

      }
    };
    this.canvas = new p5(sketch);
  };

  stopTimeline() {
    if(this.canvas){
      this.canvas.remove();
    }
  }

  convertTime(thisValue: number) {
    let timeValue = Math.abs(thisValue);
    let time;
    let hours = timeValue-(timeValue%1);
    let minutes = ((timeValue%1)*60);

    if (minutes > 59.5) {
      hours = hours + 1;
      minutes = 0;
    }
    minutes = parseInt(minutes.toFixed(0));

    let minutesText;
    let hoursText;
    if (hours === 0 ) {
      hoursText = '00';
    } else if (hours < 10 ) {
      hoursText = '0' + hours.toString();
    } else {
      hoursText =  hours.toString();
    }

    if (minutes === 0 ) {
      minutesText = '00';
    } else if (minutes < 10 ) {
      minutesText = '0' + minutes.toString();
    } else {
      minutesText = minutes.toString();
    }

    if (thisValue < -(0.1/12)) {
      time = '- ' + hoursText + ' : ' + minutesText;
    } else {
      time = '  ' + hoursText + ' : ' + minutesText;
    }

    return time;
  }

  ngOnDestroy() {
    this.stopTimeline();
  }

}
