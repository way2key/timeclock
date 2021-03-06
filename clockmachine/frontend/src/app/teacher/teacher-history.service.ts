import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { AppRuntimeConfigurationService } from '../app-runtime-config.service';

@Injectable({
  providedIn: 'root'
})
export class TeacherHistoryService {
  private apiUrl = this.runtimeConfiguration.getConfig().clockMachineApi + '/api/teacher-hist';
  private auth = 'Bearer '+ localStorage.getItem("token");
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization': this.auth
    })
  };
  constructor(private http: HttpClient, private runtimeConfiguration: AppRuntimeConfigurationService) { }

  getAllLog() {
    const url = this.apiUrl + '/log';
    return this.http.get<any>(url, this.httpOptions);
  }

  getAllIncident() {
    const url = this.apiUrl + '/incident';
    return this.http.get<any>(url, this.httpOptions);
  }

  getStudentClocksSpecificDay(payload) {
    const url = this.apiUrl + '/stat';
    return this.http.put<any>(url, payload, this.httpOptions);
  }

  getStudentDayTime(payload) {
    const url = this.apiUrl + '/stat/day-time';
    return this.http.put<any>(url, payload, this.httpOptions);
  }

}
