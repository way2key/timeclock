import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, FormBuilder} from '@angular/forms';
import * as p5 from 'p5';
import * as moment from 'moment/moment';
import { AdminDataService } from '../admin-data.service';

@Component({
  selector: 'app-admin-data-timeplan',
  templateUrl: './admin-data-timeplan.component.html',
  styleUrls: ['./admin-data-timeplan.component.scss']
})
export class AdminDataTimeplanComponent implements OnInit {
  timeplanForm = new FormGroup({
    startOfDay: new FormControl(''),
    startMorning: new FormControl(''),
    endMorning: new FormControl(''),
    startAfternoon: new FormControl(''),
    endAfternoon: new FormControl(''),
    endOfDay: new FormControl(''),
    mandatoryTime: new FormControl(''),
    timeplanName: new FormControl('')
  });
  canvas: any;
  shift = [];
  startOfDay;
  endOfDay;
  timeplans = [];
  constructor(private formBuilder: FormBuilder,private adminDataService: AdminDataService) { }

  ngOnInit(): void {
    this.initForm();
    this.updateCanvasData();
    this.drawTimeLine();
    this.getTimeplan();
  }

  drawTimeLine() {
    const sketch = s => {
      var x_start;
      var x_end;
      var y;
      s.setup = () => {
        s.createCanvas(800,400).parent('p5-sketch');
        x_start = 0.1*s.width;
        x_end = 0.9*s.width;
        y = 0.8*s.height;
      }

      s.draw = () => {
        s.clear();
        s.background(0,100);

        // shift
        s.strokeWeight(4);
        s.stroke(0);
        s.fill(100,255,0,200);
        for(let i=0; i<this.shift.length; i+=2){
          let x_1 = s.map(moment.duration(this.shift[i]).asHours(),0,24,x_start,x_end);
          let y_1 = y
          let width = s.map(moment.duration(this.shift[i+1]).asHours(),0,24,x_start,x_end)-s.map(moment.duration(this.shift[i]).asHours(),0,24,x_start,x_end);
          let height = -s.height*0.2;
          s.rect(x_1, y_1, width, height);
        }

        // boundary
        s.stroke(100,10,0);
        let x_time = s.map(this.startOfDay,0,24,x_start,x_end);
        s.strokeWeight(4);
        let startOfDayLine = s.line(x_time,0.80*s.height,x_time,0.5*s.height);;
        let x_time2 = s.map(this.endOfDay,0,24,x_start,x_end);
        let endOfDayLine = s.line(x_time2,0.80*s.height,x_time2,0.5*s.height);

        // Baseline
        s.strokeWeight(4);
        s.stroke(0);
        let baseline = s.line(x_start, y, x_end, y);
      };

    }
    this.canvas = new p5(sketch);
  }

  ngOnDestroy(): void {
    this.canvas.remove(p5);
  }

  initForm() {
    this.timeplanForm = this.formBuilder.group({
      startOfDay: '06:00',
      startMorning: '08:00',
      endMorning: '12:00',
      startAfternoon: '13:00',
      endAfternoon: '16:40',
      endOfDay: '22:00',
      mandatoryTime: '06:00',
      timeplanName: ''
    });
  }

  updateCanvasData(): void {
    this.shift = [];
    this.shift.push(this.timeplanForm.value.startMorning);
    this.shift.push(this.timeplanForm.value.endMorning);
    this.shift.push(this.timeplanForm.value.startAfternoon);
    this.shift.push(this.timeplanForm.value.endAfternoon);
    this.shift.sort();
    this.startOfDay = moment.duration(this.timeplanForm.value.startOfDay).asHours();
    this.endOfDay = moment.duration(this.timeplanForm.value.endOfDay).asHours();
  }

  onSubmit(): void {
    let shift = [];
    shift.push({start:this.timeplanForm.value.startMorning,end:this.timeplanForm.value.endMorning});
    shift.push({start:this.timeplanForm.value.startAfternoon,end:this.timeplanForm.value.endAfternoon});
    let requiredTime = moment.duration(this.timeplanForm.value.mandatoryTime).asHours();
    let startOfDay = this.timeplanForm.value.startOfDay;
    let endOfDay = this.timeplanForm.value.endOfDay;
    let name = this.timeplanForm.value.timeplanName;
    let payload = {
      requiredTime:requiredTime,
      shift:shift,
      startOfDay:startOfDay,
      endOfDay:endOfDay,
      name:name
    };
    this.adminDataService.createTimeplan(payload)
    .subscribe(
      error => this.getTimeplan()
    )
  }

  getTimeplan(): void {
    this.adminDataService.getTimeplan()
    .subscribe(
      timeplans => this.timeplans = timeplans
    )
  }

  deleteTimeplan(timeplanId): void {
    this.adminDataService.deleteTimeplan(timeplanId)
    .subscribe(
      () => this.getTimeplan()
    );
  }

}
