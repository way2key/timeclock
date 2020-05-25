import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private apiUrl = 'http://localhost:3000/api/student';


  constructor(private http: HttpClient) { }

  getStudentStatus(hash: string){
    const url = this.apiUrl + '/status/' + hash;
    return this.http.get<any>(url);
  }

  getStudentInfo(hash: string){
    const url = this.apiUrl + '/' + hash;
    return this.http.get<any>(url);
  }

  getStudentDayTime(hash: string){
    const url = this.apiUrl + '/day-time/' + hash;
    return this.http.get<any>(url);
  }

  getStudentMeal(hash: string){
    const url = this.apiUrl + '/meal/' + hash;
    return this.http.get<any>(url);
  }

  getStudentBreather(hash: string){
    const url = this.apiUrl + '/breather/' + hash;
    return this.http.get<any>(url);
  }

  clockAStudent(hash: string): Observable<any> {
    return this.http.post<any>(this.apiUrl, {hash: hash});
  }

  getStudentClock(hash: string): Observable<any> {
    const url = this.apiUrl + '/clock/' + hash;
    return this.http.get<any>(url);
  }

  getClockMachine(clockMachineId): Observable<any> {
    const url = 'http://localhost:3000/api/teacher-setting/' + clockMachineId;
    return this.http.get<any>(url);
  }
}
