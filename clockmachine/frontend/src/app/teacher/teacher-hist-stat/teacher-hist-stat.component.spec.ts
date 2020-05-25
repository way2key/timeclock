import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherHistStatComponent } from './teacher-hist-stat.component';

describe('TeacherHistStatComponent', () => {
  let component: TeacherHistStatComponent;
  let fixture: ComponentFixture<TeacherHistStatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeacherHistStatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherHistStatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
