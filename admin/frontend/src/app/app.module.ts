import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule }    from '@angular/common/http';



//Modules
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatDialogModule } from '@angular/material/dialog';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTabsModule } from '@angular/material/tabs';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatNativeDateModule } from '@angular/material/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSortModule } from '@angular/material/sort';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatStepperModule } from '@angular/material/stepper';
import { MatButtonModule } from '@angular/material/button';
import { MatMomentDateModule } from '@angular/material-moment-adapter'


//AppModule
import { AdminMainComponent } from './admin/admin-main/admin-main.component';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';
import { AdminBackupComponent } from './admin/admin-backup/admin-backup.component';
import { AdminInfoComponent } from './admin/admin-info/admin-info.component';
import { AdminDataComponent } from './admin/admin-data/admin-data.component';
import { AdminDataStudentComponent } from './admin/admin-data-student/admin-data-student.component';
import { AdminDataTimeplanComponent } from './admin/admin-data-timeplan/admin-data-timeplan.component';
import { AdminDataHolidayComponent } from './admin/admin-data-holiday/admin-data-holiday.component';
import { AdminStartComponent } from './admin/admin-start/admin-start.component';
import { AdminDataStudentAllotStudentComponent } from './admin/admin-data-student-allot-student/admin-data-student-allot-student.component';
import { AdminDataWeekComponent } from './admin/admin-data-week/admin-data-week.component';
import { AdminLoginComponent } from './admin/admin-login/admin-login.component';
import { AdminDataTeacherComponent } from './admin/admin-data-teacher/admin-data-teacher.component';

@NgModule({
  declarations: [
    AppComponent,
    AdminMainComponent,
    AdminDashboardComponent,
    AdminBackupComponent,
    AdminInfoComponent,
    AdminDataComponent,
    AdminDataStudentComponent,
    AdminDataTimeplanComponent,
    AdminDataHolidayComponent,
    AdminStartComponent,
    AdminDataStudentAllotStudentComponent,
    AdminDataWeekComponent,
    AdminLoginComponent,
    AdminDataTeacherComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatSidenavModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatListModule,
    MatCardModule,
    MatTableModule,
    MatSortModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatFormFieldModule,
    MatTabsModule,
    MatInputModule,
    MatNativeDateModule,
    MatAutocompleteModule,
    HttpClientModule,
    MatCheckboxModule,
    MatTooltipModule,
    MatExpansionModule,
    MatDatepickerModule,
    MatPaginatorModule,
    MatGridListModule,
    MatStepperModule,
    MatButtonModule,
    MatMomentDateModule,
  ],
  providers: [
    MatSnackBar,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
