import {Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-data',
  templateUrl: './admin-data.component.html',
  styleUrls: ['./admin-data.component.scss']
})
export class AdminDataComponent implements OnInit {
  navLinks = [
    { path: 'student', label: 'Stagiaire' },
    { path: 'timeplan', label: 'Horaire' },
    { path: 'week', label: 'Semaine' },
    { path: 'holiday', label: 'Vacances' },
    { path: 'teacher', label: 'Enseignant' },
  ];
  constructor() { }

  ngOnInit(): void {
  }

}
