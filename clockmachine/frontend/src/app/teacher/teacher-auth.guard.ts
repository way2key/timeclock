import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot  } from '@angular/router';
import { TeacherAuthService } from './teacher-auth.service';
import { Observable, of } from 'rxjs';
import { tap, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TeacherAuthGuard implements CanActivate {
  constructor(private teacherAuthService: TeacherAuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.teacherAuthService.isAuthenticated().pipe(
      tap( isAuthenticated => !isAuthenticated ? this.router.navigate(['/teacher/login']) : 0));
  }
}
