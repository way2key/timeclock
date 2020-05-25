import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherHistLogComponent } from './teacher-hist-log.component';

describe('TeacherHistLogComponent', () => {
  let component: TeacherHistLogComponent;
  let fixture: ComponentFixture<TeacherHistLogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeacherHistLogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherHistLogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
