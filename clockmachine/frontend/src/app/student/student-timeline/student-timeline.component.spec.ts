import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentTimelineComponent } from './student-timeline.component';

describe('StudentTimelineComponent', () => {
  let component: StudentTimelineComponent;
  let fixture: ComponentFixture<StudentTimelineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentTimelineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentTimelineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
