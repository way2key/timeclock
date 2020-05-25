import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherStudentWeekComponent } from './teacher-student-week.component';

describe('TeacherStudentWeekComponent', () => {
  let component: TeacherStudentWeekComponent;
  let fixture: ComponentFixture<TeacherStudentWeekComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeacherStudentWeekComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherStudentWeekComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
