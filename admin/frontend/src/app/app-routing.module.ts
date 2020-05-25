import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminMainComponent } from './admin/admin-main/admin-main.component';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';
import { AdminBackupComponent } from './admin/admin-backup/admin-backup.component';
import { AdminInfoComponent } from './admin/admin-info/admin-info.component';
import { AdminLoginComponent } from './admin/admin-login/admin-login.component';
import { AdminAuthGuard } from './admin/admin-auth.guard';
import { AdminStartComponent } from './admin/admin-start/admin-start.component';
import { AdminDataComponent } from './admin/admin-data/admin-data.component';
import { AdminDataTimeplanComponent } from './admin/admin-data-timeplan/admin-data-timeplan.component';
import { AdminDataHolidayComponent } from './admin/admin-data-holiday/admin-data-holiday.component';
import { AdminDataWeekComponent } from './admin/admin-data-week/admin-data-week.component';
import { AdminDataStudentComponent } from './admin/admin-data-student/admin-data-student.component';
import { AdminDataTeacherComponent } from './admin/admin-data-teacher/admin-data-teacher.component';

const routes: Routes = [
  { path: '', redirectTo: '/admin/login', pathMatch: 'full'},
  { path: 'admin', children:[
    { path: '', component: AdminMainComponent, canActivate: [AdminAuthGuard],
    children:[
      {path:"dashboard" , component: AdminDashboardComponent},
      {path:"start" , component: AdminStartComponent},
      {path:"data" , component: AdminDataComponent, children:[
        {path:"holiday"      , component: AdminDataHolidayComponent},
        {path:"week"      , component: AdminDataWeekComponent},
        {path:"timeplan"      , component: AdminDataTimeplanComponent},
        {path:"student"      , component: AdminDataStudentComponent},
        {path:"teacher"      , component: AdminDataTeacherComponent},
      ]},
      {path:"backup" , component: AdminBackupComponent},
      {path:"info" , component: AdminInfoComponent},
    ]},
    {path: 'login', component: AdminLoginComponent,},
  ]},
  { path: '**', redirectTo: '/admin/login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
