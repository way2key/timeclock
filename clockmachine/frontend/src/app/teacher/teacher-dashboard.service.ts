import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Network } from '../../assets/metadata/network';

@Injectable({
  providedIn: 'root'
})
export class TeacherDashboardService {
  private TeacherUrl =  Network.adminAPI + '/api/server/user/';
  private IncidentUrl =  Network.clockMachineApi + '/api/teacher-dashboard/incident';
  private auth = 'Bearer '+ localStorage.getItem("token");
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization': this.auth
    })
  };
  constructor(private http: HttpClient) { }

  getTeacher(token): Observable<any> {
    const url = this.TeacherUrl + token;
    return this.http.get<any>(url, this.httpOptions);
  }

  getIncident(): Observable<any> {
      return this.http.get<any>(this.IncidentUrl, this.httpOptions);
  }

  checkIncident(incident): Observable<any> {
    return this.http.put(this.IncidentUrl, incident, this.httpOptions);
  }
}
