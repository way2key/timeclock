import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { AdminAuthService } from '../admin-auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.scss']
})
export class AdminLoginComponent implements OnInit {
  loginForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });
  incorrectPassword = false;
  constructor(private adminAuthService: AdminAuthService, private router: Router) { }

  ngOnInit(): void {
    if(localStorage.getItem('token')) {
      if(this.adminAuthService.isAuthenticated()) {
        this.router.navigate(['/admin/dashboard'])
      }
    }
  }

  logAdminIn(): void {
    this.adminAuthService.logUserIn(this.loginForm.value).
    subscribe(
      res => {
        if(res.token) {
          localStorage.setItem('token', res.token);
        } else {
          console.log(res.error);
          this.incorrectPassword = true;
        }
      },
      err => {
        this.incorrectPassword = true;
        console.log('error!!!!!',err);
      },
      () => {this.router.navigate(['/admin/dashboard'])}
    )
  }

}
