import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminDataStudentAllotStudentComponent } from './admin-data-student-allot-student.component';

describe('AdminDataStudentAllotStudentComponent', () => {
  let component: AdminDataStudentAllotStudentComponent;
  let fixture: ComponentFixture<AdminDataStudentAllotStudentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminDataStudentAllotStudentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminDataStudentAllotStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
