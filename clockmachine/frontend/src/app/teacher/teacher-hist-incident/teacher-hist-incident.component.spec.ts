import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherHistIncidentComponent } from './teacher-hist-incident.component';

describe('TeacherHistIncidentComponent', () => {
  let component: TeacherHistIncidentComponent;
  let fixture: ComponentFixture<TeacherHistIncidentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeacherHistIncidentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherHistIncidentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
