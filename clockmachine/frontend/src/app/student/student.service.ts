import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Network } from '../../assets/metadata/network';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private apiUrl = Network.clockMachineApi + '/api/student';


  constructor(private http: HttpClient) {}

  getStudentStatus(hash: string){
    const url = Network.clockMachineApi + '/api/student/status/' + hash;
    return this.http.get<any>(url);
  }

  getStudentInfo(hash: string){
    const url = Network.clockMachineApi + '/api/student/' + hash;
    return this.http.get<any>(url);
  }

  getStudentDayTime(hash: string){
    const url = Network.clockMachineApi + '/api/student/day-time/' + hash;
    return this.http.get<any>(url);
  }

  getStudentMeal(hash: string){
    const url = Network.clockMachineApi + '/api/student/meal/' + hash;
    return this.http.get<any>(url);
  }

  getStudentBreather(hash: string){
    const url = Network.clockMachineApi + '/api/student/breather/' + hash;
    return this.http.get<any>(url);
  }

  clockAStudent(hash: string): Observable<any> {
    return this.http.post<any>(Network.clockMachineApi + '/api/student', {hash: hash});
  }

  getStudentClock(hash: string): Observable<any> {
    const url = Network.clockMachineApi + '/api/student/clock/' + hash;
    return this.http.get<any>(url);
  }

  getClockMachine(clockMachineId): Observable<any> {
    const url = Network.clockMachineApi + '/api/teacher-setting/' + clockMachineId;
    return this.http.get<any>(url);
  }
}
