import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherHistMoreComponent } from './teacher-hist-more.component';

describe('TeacherHistMoreComponent', () => {
  let component: TeacherHistMoreComponent;
  let fixture: ComponentFixture<TeacherHistMoreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeacherHistMoreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherHistMoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
