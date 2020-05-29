import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Network } from '../../assets/network';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthService {
  private loginUrl = Network.adminAPI + '/api/admin-auth/login';
  private verifyTokenUrl = Network.adminAPI + '/api/admin-auth/verifyToken';
  private auth = 'Bearer '+ localStorage.getItem("token");
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization': this.auth
    })
  };

  constructor(private http: HttpClient, private router: Router){ }
  private isAuth = false;
  private token = localStorage.getItem('token');

  logUserIn(user) {
    return this.http.post<any>(this.loginUrl, user);
  }

  logUserOut() {
    localStorage.removeItem('token');
    this.router.navigate(['admin/login']);
  }

  isAuthenticated(): Observable<boolean>{
    let token = localStorage.getItem('token');
    const url = this.verifyTokenUrl + '/admin/' + token;
    return this.http.get<boolean>(url, this.httpOptions);
  }
}
