import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { TeacherAuthService } from '../teacher-auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-teacher-login',
  templateUrl: './teacher-login.component.html',
  styleUrls: ['./teacher-login.component.scss']
})
export class TeacherLoginComponent implements OnInit {
  loginForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });

  incorrectPassword = false;

  constructor(private teacherAuthService: TeacherAuthService, private router: Router) { }

  ngOnInit(): void {
    if(localStorage.getItem('token')) {
      if(this.teacherAuthService.isAuthenticated()) {
        this.router.navigate(['/teacher/dashboard'])
      }
    }
  }

  logUserIn(): void {
    this.teacherAuthService.logUserIn(this.loginForm.value).
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
      () => {this.router.navigate(['/teacher/dashboard'])}
    )
  }


}
