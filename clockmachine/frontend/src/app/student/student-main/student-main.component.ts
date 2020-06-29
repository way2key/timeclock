import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { StudentInfoComponent } from '../student-info/student-info.component';
import { StudentService } from '../student.service';
import { StudentMessageComponent } from '../student-message/student-message.component';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Howl, Howler } from 'howler';
import { AppRuntimeConfigurationService } from '../../app-runtime-config.service';


@Component({
  selector: 'app-student-main',
  templateUrl: './student-main.component.html',
  styleUrls: ['./student-main.component.scss']
})
export class StudentMainComponent implements OnInit {
  public infoRequested = false;
  cardForm = new FormGroup({
    cardNumber: new FormControl(''),
    password: new FormControl(''),
  });
  refresh="";
  sound;
  private msg = 0;
  private std = {};
  private stat = false;
  private err = "";


  constructor(public dialog: MatDialog, private studentService: StudentService, private runtimeConfiguration: AppRuntimeConfigurationService) { }

  ngOnInit(): void {
    this.selectField();
    this.getSound();
  }

  public info(): void{
    this.infoRequested = !this.infoRequested;
    this.selectField();
  }

  readCard() {
    let cardHashValue = this.cardForm.value.cardNumber;
    this.refresh="";

    this.selectField();
    if(this.infoRequested){
      this.infoRequested = !this.infoRequested;
      this.showInfo(cardHashValue);
    }else {
      this.showMessage(cardHashValue);
    }
  }

  showInfo(studentHash) {
    this.studentService.getClockMachine(this.runtimeConfiguration.getConfig().clockMachineId).subscribe(
      clockMachine => {
        let file = clockMachine.sound.info;
        let path = "../../../assets/sound/"+file;
        var sound = new Howl({
          src: [path]
        });
        sound.play();
      }
    )
    let dialogRef = this.dialog.open(StudentInfoComponent,{data: {hash: studentHash}});
    setTimeout(()=>{dialogRef.close()},7000);
    dialogRef.afterClosed().subscribe(result => {
      this.selectField();
    })
  }

  showMessage(studentHash) {
    this.clock(studentHash)
    .then(
      () => {
        return this.getStudent(studentHash)
      }
    )
    .then(
      student => {
        this.std = student;
        this.msg = 1;
        return this.getStatus(studentHash);
      }
    )
    .then(
      status => {
        this.stat = status;
        if(status){
          this.status = true;
          this.sound.clockIn.play();
        } else {
          this.status = false;
          this.sound.clockOff.play();
        }
        this.launchDialog(this.msg,this.stat,this.std,this.err);
      }
    )
    .catch(
      error => {
        this.msg = 0;
        this.err = error;
        this.sound.error.play();
        this.launchDialog(this.msg,this.stat,this.std,this.err);
      }
    )
  }

  launchDialog(msg, stat, std, err) {
    let dialogRef = this.dialog.open(StudentMessageComponent,{data:{message: msg, status: stat, student: std, error: err},role: 'alertdialog',restoreFocus:true});
    setTimeout(()=>{dialogRef.close()},3000);
    dialogRef.afterClosed().subscribe(result => {
      this.selectField();
    })
  }
  selectField() {
    document.getElementById("cardInput").focus();
  }

  getSound() {
    this.studentService.getClockMachine(this.runtimeConfiguration.getConfig().clockMachineId).subscribe(
      clockMachine => {
        let sound={};
        Object.entries(clockMachine.sound).map(item => {
          let path = "./assets/sound/"+item[1];
           sound[item[0]] = new Howl({
            src: [path]
          });
        });
        this.sound = sound;

        Howler.volume(clockMachine.volume/100);
      }
    )
  }

  clock(studentHash) {
    return new Promise( (resolve, reject) => {
      this.studentService.clockAStudent(studentHash).subscribe(
        data => {
          console.log('success: ', data);
          resolve(data);
        },
        error => {
          console.log('error: ', error);
          reject(error);
        }
      )
    });
  }

  getStatus(studentHash) {
    return new Promise( (resolve, reject) => {
      this.studentService.getStudentStatus(studentHash).subscribe(
        status => resolve(status),
        error => reject(error)
      )
    })
  }

  getStudent(studentHash) {
    return new Promise( (resolve, reject) => {
      this.studentService.getStudentInfo(studentHash).subscribe(
        student => resolve(student),
        error => reject(error)
      )
    })
  }



}
