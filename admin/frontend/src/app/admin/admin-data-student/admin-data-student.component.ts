import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { forkJoin, of, throwError } from 'rxjs';
import { map, startWith, catchError } from 'rxjs/operators';
import * as csv2json from 'csvjson-csv2json';
import { AdminDataService } from '../admin-data.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AdminDataStudentAllotStudentComponent } from '../admin-data-student-allot-student/admin-data-student-allot-student.component';

@Component({
  selector: 'app-admin-data-student',
  templateUrl: './admin-data-student.component.html',
  styleUrls: ['./admin-data-student.component.scss']
})
export class AdminDataStudentComponent implements OnInit {
  data;
  students = [];
  shownStudents = [];
  searchField = '';
  interaction = new FormControl('');
  filteredOptions: Observable<string[]>;
  constructor(private adminDataService: AdminDataService, public dialog: MatDialog, private snackBar: MatSnackBar,) { }

  ngOnInit(): void {
    this.getStudents();
    this.filteredOptions = this.interaction.valueChanges
    .pipe(
      startWith(''),
      map(value =>  this._filter(value))
    );
  }

  getStudents(): void {
    this.adminDataService.getStudents()
    .subscribe(
      students => {
        this.students = students;
        this.shownStudents = students;
      }
    )
  }

  deleteAllStudent(): void {
    let source$ = this.students.map(s => {return this.adminDataService.deleteStudent(s._id);});
    forkJoin(source$)
    .pipe(
      catchError(
        error => {throw error;}
      )
    )
    .subscribe(
      () => {
        this.openSnackBar('Stagiaires supprimés avec succès');
        this.getStudents();
      },
      error => {
        this.openSnackBar(error.error);
        this.getStudents();
      }
    )
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, 'FERMER', {
      duration: 4000,
    })
  }

  clearSearchField() {
    this.searchField = '';
  }

  private _filter(option: string): string[] {
    const filterValue = option.toLowerCase();
    this.shownStudents = this.students.filter(student => {
      let search = (student.firstname + " " + student.lastname).toLowerCase();
      return (search.includes(filterValue));
    });
    return this.shownStudents.map(student => (student.firstname + " " + student.lastname))
  }

  onFileSelect(event: Event) {
   const file = (event.target as HTMLInputElement).files[0];
   const reader = new FileReader();
   reader.onload = (fileLoadedEvent) => {
     const content = fileLoadedEvent.target.result.toString();
     this.data = csv2json(content);
   }
   reader.readAsText(file, "UTF-8");
   }

  importStudent(){
     if(this.data.length){
       for(let user of this.data){
         let payload = {
           firstname: user.firstname,
           lastname: user.lastname,
           hash: user.hash
         };
         this.adminDataService.createAStudent(null,payload)
         .subscribe(
           () => this.getStudents()
         );
       }
     }
   }

  allotStudent(){
     let dialogRef = this.dialog.open(AdminDataStudentAllotStudentComponent, {data: this.students, height:'90%', width: '65%'});
     dialogRef.afterClosed()
     .subscribe(
       () => this.getStudents()
     )
   }
}
