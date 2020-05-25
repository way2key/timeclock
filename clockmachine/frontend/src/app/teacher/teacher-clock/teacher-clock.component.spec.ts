import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherClockComponent } from './teacher-clock.component';

describe('TeacherClockComponent', () => {
  let component: TeacherClockComponent;
  let fixture: ComponentFixture<TeacherClockComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeacherClockComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherClockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
