import {Component, OnInit } from '@angular/core';
import {FormGroup, FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';

@Component({
  selector: 'app-teacher-hist',
  templateUrl: './teacher-hist.component.html',
  styleUrls: ['./teacher-hist.component.scss']
})

export class TeacherHistComponent implements OnInit {
  navLinks = [
    { path: 'stat', label: 'Statistiques' },
    { path: 'log', label: 'Logs' },
    { path: 'incident', label: 'Incidents' },
    { path: 'more', label: 'More' },
  ];
  myControl = new FormControl();
  options: string[] = ['One', 'Two', 'Three'];
  filteredOptions: Observable<string[]>;
  constructor() { }

  ngOnInit(): void {
    this.filteredOptions = this.myControl.valueChanges
    .pipe(
      startWith(''),
      map(value => this._filter(value))
    );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }

}
