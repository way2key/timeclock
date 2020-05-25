import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminDataStudentComponent } from './admin-data-student.component';

describe('AdminDataStudentComponent', () => {
  let component: AdminDataStudentComponent;
  let fixture: ComponentFixture<AdminDataStudentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminDataStudentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminDataStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
