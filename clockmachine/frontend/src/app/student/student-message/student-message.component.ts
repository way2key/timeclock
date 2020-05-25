import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { StudentService } from '../student.service';
import { Howl, Howler } from 'howler';

@Component({
  selector: 'app-student-message',
  templateUrl: './student-message.component.html',
  styleUrls: ['./student-message.component.scss']
})
export class StudentMessageComponent implements OnInit {
  message;
  status;
  student;
  clockMachineId="5eac2b3d197357249cc24249";
  sound;
  error;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private studentService: StudentService) { }

  ngOnInit() {
    this.getSound();
    this.clock(this.data.hash)
    .then(
      () => {
        return this.getStudent(this.data.hash)
      }
    )
    .then(
      student => {
        this.student = student
        this.message = 1;
        return this.getStatus(this.data.hash);
      }
    )
    .then(
      status => {
        this.status = status
        if(status){
          this.status = true;
          this.sound.clockIn.play();
        } else {
          this.status = false;
          this.sound.clockOff.play();
        }
      }
    )
    .catch(
      error => {
        this.message = 0;
        this.error = error;
        this.sound.error.play();
      }
    )
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

  getSound() {
    this.studentService.getClockMachine(this.clockMachineId).subscribe(
      clockMachine => {
        let sound={};
        Object.entries(clockMachine.sound).map(item => {
          let path = "../../../assets/sound/"+item[1];
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

}
