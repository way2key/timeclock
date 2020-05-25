import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherHistComponent } from './teacher-hist.component';

describe('TeacherHistComponent', () => {
  let component: TeacherHistComponent;
  let fixture: ComponentFixture<TeacherHistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeacherHistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherHistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
