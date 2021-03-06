import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AppRuntimeConfigurationService } from '../app-runtime-config.service';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private configuration = this.runtimeConfiguration.getConfig();
  private apiUrl = this.configuration.clockMachineApi + '/api/student';


  constructor(private http: HttpClient, private runtimeConfiguration: AppRuntimeConfigurationService) {}

  getStudentStatus(hash: string){
    const url = this.configuration.clockMachineApi + '/api/student/status/' + hash;
    return this.http.get<any>(url);
  }

  getStudentInfo(hash: string){
    const url = this.configuration.clockMachineApi + '/api/student/' + hash;
    return this.http.get<any>(url);
  }

  getStudentDayTime(hash: string){
    const url = this.configuration.clockMachineApi + '/api/student/day-time/' + hash;
    return this.http.get<any>(url);
  }

  getStudentMeal(hash: string){
    const url = this.configuration.clockMachineApi + '/api/student/meal/' + hash;
    return this.http.get<any>(url);
  }

  getStudentBreather(hash: string){
    const url = this.configuration.clockMachineApi + '/api/student/breather/' + hash;
    return this.http.get<any>(url);
  }

  clockAStudent(hash: string): Observable<any> {
    return this.http.post<any>(this.configuration.clockMachineApi + '/api/student/clock', {hash: hash});
  }

  getStudentClock(hash: string): Observable<any> {
    const url = this.configuration.clockMachineApi + '/api/student/clock/' + hash;
    return this.http.get<any>(url);
  }

  getClockMachine(clockMachineId): Observable<any> {
    const url = this.configuration.clockMachineApi + '/api/teacher-setting/' + clockMachineId;
    return this.http.get<any>(url);
  }
}
