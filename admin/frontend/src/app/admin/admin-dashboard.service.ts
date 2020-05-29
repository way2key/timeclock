import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Network } from '../../assets/network';
@Injectable({
  providedIn: 'root'
})
export class AdminDashboardService {
  private adminUrl = Network.adminAPI + '/api/admin-dashboard/admin';
  private auth = 'Bearer '+ localStorage.getItem("token");
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization': this.auth
    })
  };

  constructor(private http: HttpClient) { }

  getTeacher(): Observable<any> {
    const url = this.adminUrl + '/teacher'
    return this.http.get<any>(url, this.httpOptions);
  }

  getAdmin(): Observable<any> {
    return this.http.get<any>(this.adminUrl, this.httpOptions);
  }
}
