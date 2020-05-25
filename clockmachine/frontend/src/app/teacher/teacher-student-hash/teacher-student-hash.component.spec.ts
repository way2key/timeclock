import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherStudentHashComponent } from './teacher-student-hash.component';

describe('TeacherStudentHashComponent', () => {
  let component: TeacherStudentHashComponent;
  let fixture: ComponentFixture<TeacherStudentHashComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeacherStudentHashComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherStudentHashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
