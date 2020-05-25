import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { interval, Subscription } from 'rxjs';
import * as moment from 'moment';

@Component({
  selector: 'app-teacher-clock',
  templateUrl: './teacher-clock.component.html',
  styleUrls: ['./teacher-clock.component.scss']
})
export class TeacherClockComponent implements OnInit {
  @ViewChild('canvas', { static: true})
  canvas: ElementRef<HTMLCanvasElement>;
  private ctx: CanvasRenderingContext2D;
  private radius: number;

  subscription: Subscription;


  constructor() { }

  ngOnInit(): void {
    this.initCanvas();
    const counter = interval(100);
    counter.subscribe(
      (value) => {

        this.drawClock(this.ctx, this.radius)
      }
    )
  }

  initCanvas() {
    this.ctx =  this.canvas.nativeElement.getContext('2d');
    this.radius = this.ctx.canvas.width/2;
    this.ctx.translate(this.radius, this.radius);
    this.radius = 0.9 * this.radius;
  }

  drawClock(ctx: CanvasRenderingContext2D, radius: number) {

    this.drawFace(ctx, radius);
    this.drawNumbers(ctx, radius);
    this.drawTime(ctx, radius);
  }

  drawFace(ctx: CanvasRenderingContext2D, radius: number) {


    ctx.beginPath();
    ctx.arc(0, 0, radius*1.05, 0, 2*Math.PI);
    ctx.fillStyle = 'black';
    ctx.fill();

    ctx.beginPath();
    ctx.arc(0, 0, radius, 0, 2*Math.PI);
    ctx.fillStyle = 'white';
    ctx.fill();
  }

  drawNumbers(ctx: CanvasRenderingContext2D, radius: number) {

    ctx.fillStyle = 'black';
    let ang;
    let num;

    for(num = 1; num < 13; num++) {
      ang = num * Math.PI / 6;
      ctx.rotate(ang);
      ctx.translate(0, -radius * 0.97);
      ctx.fillRect(-0.035*radius,0,radius*0.07,radius*0.24);
      ctx.translate(0, radius * 0.97);
      ctx.rotate(-ang);
    };
    for(num = 1; num < 60; num++) {
      if(num%5 !== 0) {
        ang = num * Math.PI / 30;
        ctx.rotate(ang);
        ctx.translate(0, -radius * 0.97);
        ctx.fillRect(-0.014*radius,0,radius*0.028,radius*0.07);
        ctx.translate(0, radius * 0.97);
        ctx.rotate(-ang);
      };
    };
  }

  drawTime(ctx: CanvasRenderingContext2D, radius: number) {

    let now = moment();
    let hour = now.hour();
    let minute = now.minute();
    let second = now.second();
    let millis = now.millisecond();



    hour = hour%12;
    hour = (hour*Math.PI/6)+(minute*Math.PI/(6*60));
    this.drawHour(ctx, hour, radius);

    minute = (minute*Math.PI/(30));
    this.drawMinute(ctx, minute, radius);

    millis = (((millis+(1000*second))*60/59)/1000);
    if(millis>60) {
      millis = 60;
    };
    second = millis*Math.PI/30;
    this.drawSecond(ctx, second, radius);

  }

  drawHour(ctx: CanvasRenderingContext2D, pos: number, radius: number) {
    ctx.fillStyle = 'black';
    ctx.moveTo(0,0);
    ctx.rotate(pos);
    ctx.beginPath();
    ctx.moveTo(radius*0.064,radius*0.24);
    ctx.lineTo(radius*0.052,-radius*0.64);
    ctx.lineTo(-radius*0.052,-radius*0.64);
    ctx.lineTo(-radius*0.064,radius*0.24);
    ctx.lineTo(radius*0.064,radius*0.24);
    ctx.fill();
    ctx.closePath();
    ctx.rotate(-pos);
  }

  drawMinute(ctx: CanvasRenderingContext2D, pos: number, radius: number) {
    ctx.fillStyle = 'black';
    ctx.moveTo(0,0);
    ctx.rotate(pos);
    ctx.beginPath();
    ctx.moveTo(radius*0.052,radius*0.24);
    ctx.lineTo(radius*0.036,-radius*0.92);
    ctx.lineTo(-radius*0.036,-radius*0.92);
    ctx.lineTo(-radius*0.052,radius*0.24);
    ctx.lineTo(radius*0.052,radius*0.24);
    ctx.fill();
    ctx.closePath();
    ctx.rotate(-pos);

  }

  drawSecond(ctx: CanvasRenderingContext2D, pos: number, radius: number) {
    ctx.fillStyle = 'red';
    ctx.beginPath();
    ctx.moveTo(0,0);
    ctx.rotate(pos);
    ctx.fillRect(radius*0.014,radius*0.33,-radius*0.028,-radius*0.974);
    ctx.translate(0,-radius*0.624);
    ctx.arc(0, 0, radius*0.105, 0, 2*Math.PI);
    ctx.fill();
    ctx.translate(0,radius*0.624);
    ctx.rotate(-pos);
  }

  ngOnDestroy(){

  }

}
