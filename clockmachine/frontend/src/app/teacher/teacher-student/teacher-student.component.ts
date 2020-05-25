import { Component, OnInit } from '@angular/core';
import { TeacherStudentService } from '../teacher-student.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormGroup, FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { forkJoin, of, throwError } from 'rxjs';
import { map, startWith, catchError } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { TeacherStudentTimeComponent } from '../teacher-student-time/teacher-student-time.component';
import { TeacherStudentHashComponent } from '../teacher-student-hash/teacher-student-hash.component';
import { TeacherStudentWeekComponent } from '../teacher-student-week/teacher-student-week.component';

import * as moment from 'moment';


@Component({
  selector: 'app-teacher-student',
  templateUrl: './teacher-student.component.html',
  styleUrls: ['./teacher-student.component.scss']
})

export class TeacherStudentComponent implements OnInit {
  students = [];
  shownStudents = [];
  disabled = true;
  myControl = new FormControl();
  options = [];
  filteredOptions: Observable<string[]>;
  searchField = '';
  week = [];
  teacher;

  constructor(private teacherStudentService: TeacherStudentService,
              private snackBar: MatSnackBar,
              public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getATeacher();
    this.getStudents();
    this.getWeek();
  }

  onAll() {
    if (this.students.every(student =>student.isSelected)){
      this.deselectAll();
      document.getElementById("allButton").innerHTML = "Tout sélectionner";
    } else {
      this.selectAll();
      document.getElementById("allButton").innerHTML = "Tout désélectionner";
    }
  }

  selectAll() {
    this.students.forEach(student => {
      student.isSelected = true;
    });
    this.disabled = false;
  }

  deselectAll() {
    this.students.forEach(student => {
      student.isSelected = false;
    });
    this.disabled = true;
  }

  onCheckBox() {
    if (this.students.every(student => student.isSelected)){
        document.getElementById("allButton").innerHTML = "Tout déselectionner";
    } else {
        document.getElementById("allButton").innerHTML = "Tout sélectionner";
    }

    if(this.students.some((student) => student.isSelected)) {
      this.disabled = false;

      return false;
    } else {
      this.disabled = true;
      return true;
    }
    this.clearSearchField();
  }

  getStudents(): void {
    this.students = [];
    this.teacherStudentService.getAllStudents()
    .subscribe((dbStudents) => {
      this.students = dbStudents;
      for (let student of this.students) {
        this.getStudentStatus(student.hash)
        .then(
          status => {
            student['isSelected'] = false;
            student['status'] = status;
          }
        )
        this.getStudentPresence(student.hash)
        .then(
          presence => {
            student['presence'] = presence;
          }
        )
      }
      this.students.sort(this.alphabeticalSort('lastname'));
      this.shownStudents = this.students;
      this.autocompleteFill();
      this.filteredOptions = this.myControl.valueChanges
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

  getWeek(): void {
    this.teacherStudentService.getWeek()
    .subscribe(
      weeks => {
        this.week=[];
        for (let t of weeks) {
          this.week.push({name:t.name,id:t._id})
        }
      },
      error => console.log(error)
    )
  }

  getStudentStatus(studentHash) {
    return new Promise(( resolve, reject) => {
      this.teacherStudentService.getStudentStatus(studentHash)
      .subscribe(
        status => resolve(status)
      )
    })
  }

  getStudentPresence(studentHash) {
    return new Promise(( resolve, reject) => {
      this.teacherStudentService.getStudentPresence(studentHash)
      .subscribe(
        status => resolve(status)
      )
    })
  }

  getWeekName(id) {
    let out = "";
    this.week.map(t => {
      if(t.id == id){
        out = t.name;
      }
    })
    return out;
  }

  getATeacher(){
    this.teacherStudentService.getATeacher()
    .subscribe(
      teacher => {
        this.teacher = teacher;
    }
    )
  }

  modifyTime() {
    let dialogRef = this.dialog.open(TeacherStudentTimeComponent, {data: {students: this.students, closed: false}});

    dialogRef.afterClosed()
    .subscribe(
      result => {
        this.openSnackBar('le temps a été modifié avec succès');
        this.getStudents();
        this.onAll();
      },
      error => {
        this.openSnackBar(error.error);
      }
    )
  }

  modifyPresence() {
    let source$ = this.students.filter(s => s.isSelected).map(s => {
      let log = {
        "teacher": this.teacher.firstname + " " + this.teacher.lastname,
        "message": "",
        "studentId": s._id,
        "operation": "Presence modifiée"
      };
      this.createLog(log);
      let payload = {hash: s.hash};
      return this.teacherStudentService.modifyPresence(payload);
    });

    forkJoin(source$)
    .pipe(
      catchError(
        error => {throw error;}
      )
    )
    .subscribe(
      () => {
        this.openSnackBar('Présence modifiée avec succès');
        this.onAll();
        this.getStudents();
      },
      error => {
        this.openSnackBar(error.error);
        this.onAll();
        this.getStudents();
      }
    )
  }

  modifyHash() {
    let selectedStudent = this.students.filter(s => s.isSelected);
    let dialogRef = this.dialog.open(TeacherStudentHashComponent, {data:{students:selectedStudent}});

    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.openSnackBar('Le hash a été mis à jour');
      } else {
        this.openSnackBar("Le hash n'a été mis à jour");
      }

      this.getStudents();
      this.onAll();
    })
  }

  createLog(payload) {
    this.teacherStudentService.createLog(payload)
    .subscribe(
      result => console.log(result)
    )
  }

  assignWeek() {
    let selectedStudent = this.students.filter(s => s.isSelected);
    let dialogRef = this.dialog.open(TeacherStudentWeekComponent, {data:{students:selectedStudent, week:this.week}});

    dialogRef.afterClosed().subscribe(
      () => {
      this.openSnackBar('Horaire mis à jour');
      this.getStudents();
      this.onAll();
    })
  }

  deleteStudent() {
    let source$ = this.students.filter(s => s.isSelected).map(s => {return this.teacherStudentService.deleteStudent(s._id);});
    forkJoin(source$)
    .pipe(
      catchError(
        error => {throw error;}
      )
    )
    .subscribe(
      () => {
        this.openSnackBar('Stagiaires supprimé avec succès');
        this.onAll();
        this.getStudents();
      },
      error => {
        this.openSnackBar(error.error);
        this.onAll();
        this.getStudents();
      }
    )
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, 'FERMER', {
      duration: 4000,
    })
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }

  autocompleteFill() {
    this.options = [];
    for(let student of this.students) {
      let name = student.firstname + ' ' + student.lastname;
      this.options.push(name);
    }
  }

  alphabeticalSort(lastname: string) {
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

  clearSearchField() {
    this.searchField = '';
    this.shownStudents = this.students;
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

}
