import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AdminDataService {
  private apiUrl = 'http://localhost:4000/api/admin-data';
  private auth = 'Bearer '+ localStorage.getItem("token");
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization': this.auth
    })
  };
  constructor(private http: HttpClient) { }

  createTimeplan(payload) {
    const url = this.apiUrl + '-timeplan';
    return this.http.post<any>(url, payload, this.httpOptions);
  }

  getTimeplan() {
    const url = this.apiUrl + '-timeplan/timeplan';
    return this.http.get<any>(url, this.httpOptions);
  }

  getStudents() {
    const url = this.apiUrl + '-student/';
    return this.http.get<any>(url, this.httpOptions);
  }

  createAStudent(url, payload) {
    url = url || (this.apiUrl + '-student/');
    return this.http.post<any>(url, payload);
  }

  allotStudent(student) {
    const url = this.apiUrl + '-student/';
    return this.http.put<any>(url, student, this.httpOptions);
  }

  createHoliday(payload) {
    const url = this.apiUrl + '-holiday/';
    return this.http.post<any>(url, payload, this.httpOptions);
  }

  getHoliday() {
    const url = this.apiUrl + '-holiday/';
    return this.http.get<any>(url, this.httpOptions);
  }

  deleteTimeplan(timeplanId) {
    const url = this.apiUrl + '-timeplan/timeplan/' + timeplanId;
    return this.http.delete<any>(url, this.httpOptions);
  }

  deleteHoliday(holidayId) {
    const url = this.apiUrl + '-holiday/' + holidayId;
    return this.http.delete<any>(url, this.httpOptions);
  }

  deleteStudent(studentId) {
    const url = this.apiUrl + '-student/' + studentId;
    return this.http.delete<any>(url, this.httpOptions);
  }

  getWeek() {
    const url = this.apiUrl + '-week/';
    return this.http.get<any>(url, this.httpOptions);
  }

  createWeek(week) {
    const url = this.apiUrl + '-week/';
    return this.http.post<any>(url, week, this.httpOptions);
  }

  deleteWeek(weekId) {
    const url = this.apiUrl + '-week/' + weekId;
    return this.http.delete<any>(url, this.httpOptions);
  }

  createTeacher(payload) {
    const url = this.apiUrl + '-teacher/';
    return this.http.post<any>(url, payload, this.httpOptions);
  }

  getAllTeachers() {
    const url = this.apiUrl + '-teacher/';
    return this.http.get<any>(url, this.httpOptions);
  }

  deleteTeacher(teacherId) {
    const url = this.apiUrl + '-teacher/' + teacherId;
    console.log(url);

    return this.http.delete<any>(url, this.httpOptions);
  }

}
