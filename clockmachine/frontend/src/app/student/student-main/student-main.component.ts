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


  constructor(public dialog: MatDialog, private studentService: StudentService, private runtimeConfiguration: AppRuntimeConfigurationService) { }

  ngOnInit(): void {
    this.selectField();
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
    let dialogRef = this.dialog.open(StudentMessageComponent,{data:{hash: studentHash},role: 'alertdialog',restoreFocus:true});
    setTimeout(()=>{dialogRef.close()},3000);
    dialogRef.afterClosed().subscribe(result => {
      this.selectField();
    })
  }

  selectField() {
    document.getElementById("cardInput").focus();
  }

}
