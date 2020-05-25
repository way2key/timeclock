import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherStudentTimeComponent } from './teacher-student-time.component';

describe('TeacherStudentTimeComponent', () => {
  let component: TeacherStudentTimeComponent;
  let fixture: ComponentFixture<TeacherStudentTimeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeacherStudentTimeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherStudentTimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
