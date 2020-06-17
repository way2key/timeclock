import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { AppRuntimeConfigurationService } from '../app-runtime-config.service';

@Injectable({
  providedIn: 'root'
})
export class TeacherSettingService {
  private teacherUrl = this.runtimeConfiguration.getConfig().clockMachineApi + '/api/teacher-setting';
  private adminUrl = this.runtimeConfiguration.getConfig().adminAPI + '/api/admin-data-week';
  private auth = 'Bearer '+ localStorage.getItem("token");
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization': this.auth
    })
  };
  constructor(private http: HttpClient, private runtimeConfiguration: AppRuntimeConfigurationService) { }

  updatePassword(password) {
    const url = this.teacherUrl + "/password";
    return this.http.put<any>(url, password, this.httpOptions);
  }

  getClockMachine(clockMachineId) {
    const url = this.teacherUrl + "/" + clockMachineId;
    return this.http.get<any>(url, this.httpOptions);
  }

  getDefaultWeek() {
    const url = this.adminUrl;
    return this.http.get<any>(url, this.httpOptions);
  }

  getSound() {
    const url = this.runtimeConfiguration.getConfig().clockMachineApi + "/api/server/sound";
    return this.http.get<any>(url, this.httpOptions);
  }

  updateClockMachineNotification(payload) {
    const url = this.teacherUrl + "/notification";
    return this.http.put<any>(url, payload, this.httpOptions);
  }

  updateClockMachineVolume(payload) {
    const url = this.teacherUrl + "/volume";
    return this.http.put<any>(url, payload, this.httpOptions);
  }

  updateClockMachineDefaultWeek(payload) {
    const url = this.teacherUrl + "/week";
    return this.http.put<any>(url, payload, this.httpOptions);
  }

  updateClockMachineSound(payload) {
    const url = this.teacherUrl + "/sound";
    return this.http.put<any>(url, payload, this.httpOptions);
  }

  deleteLog() {
    const url = this.teacherUrl + "/log";
    return this.http.delete<any>(url, this.httpOptions);
  }

  deleteIncident() {
    const url = this.teacherUrl + "/incident";
    return this.http.delete<any>(url, this.httpOptions);
  }
}
