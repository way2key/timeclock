import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { StudentInfoComponent } from '../student-info/student-info.component';
import { StudentService } from '../student.service';
import { StudentMessageComponent } from '../student-message/student-message.component';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Howl, Howler } from 'howler';

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
  clockMachineId="5eac2b3d197357249cc24249";

  constructor(public dialog: MatDialog, private studentService: StudentService) { }

  ngOnInit(): void {
    document.getElementById("cardNumber").focus();
  }

  public info(): void{
    this.infoRequested = !this.infoRequested;
  }

  readCard() {
    let cardHashValue = this.cardForm.value.cardNumber;
    this.refresh="";
    if(this.infoRequested){
      this.infoRequested = !this.infoRequested;
      this.showInfo(cardHashValue);
    }else {
      this.showMessage(cardHashValue);
    }
  }

  showInfo(studentHash) {
    this.studentService.getClockMachine(this.clockMachineId).subscribe(
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
    dialogRef.afterClosed().subscribe(result =>{
      console.log('The dialog was closed');
    })
  }

  showMessage(studentHash) {
    let dialogRef = this.dialog.open(StudentMessageComponent,{data: {hash: studentHash}});

    dialogRef.afterClosed().subscribe(result =>{
    })
  }

}
