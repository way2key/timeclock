import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StudentMainComponent } from './student/student-main/student-main.component';
import { StudentInfoComponent } from './student/student-info/student-info.component';
import { StudentMessageComponent } from './student/student-message/student-message.component';
import { TeacherLoginComponent } from './teacher/teacher-login/teacher-login.component';
import { TeacherMainComponent } from './teacher/teacher-main/teacher-main.component';
import { TeacherDashboardComponent } from './teacher/teacher-dashboard/teacher-dashboard.component';
import { TeacherStudentComponent } from './teacher/teacher-student/teacher-student.component';
import { TeacherHistComponent } from './teacher/teacher-hist/teacher-hist.component';
import { TeacherSettingComponent } from './teacher/teacher-setting/teacher-setting.component';
import { TeacherInfoComponent } from './teacher/teacher-info/teacher-info.component';
import { TeacherAuthGuard } from './teacher/teacher-auth.guard';
import { TeacherHistStatComponent } from './teacher/teacher-hist-stat/teacher-hist-stat.component';
import { TeacherHistLogComponent } from './teacher/teacher-hist-log/teacher-hist-log.component';
import { TeacherHistIncidentComponent } from './teacher/teacher-hist-incident/teacher-hist-incident.component';
import { TeacherHistMoreComponent } from './teacher/teacher-hist-more/teacher-hist-more.component';


const routes: Routes = [
  { path: '', redirectTo: '/student', pathMatch: 'full' },
  { path: 'student', component: StudentMainComponent },
  { path: 'teacher', children:[
      { path: '', component: TeacherMainComponent, canActivate: [TeacherAuthGuard],
        children:[
          {path:"dashboard" , component: TeacherDashboardComponent},
          {path:"student"   , component: TeacherStudentComponent},
          {path:"hist"      , component: TeacherHistComponent, children:[
            {path:"stat"      , component: TeacherHistStatComponent},
            {path:"log"      , component: TeacherHistLogComponent},
            {path:"incident"      , component: TeacherHistIncidentComponent},
            {path:"more"      , component: TeacherHistMoreComponent}
            ]},
          {path:"setting"   , component: TeacherSettingComponent},
          {path:"info"      , component: TeacherInfoComponent},
          {path: '', redirectTo: '/teacher/dashboard', pathMatch: 'full'},
        ]
      },
      {path: 'login', component: TeacherLoginComponent,},
    ]},
  { path: '**', redirectTo: '/student' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
