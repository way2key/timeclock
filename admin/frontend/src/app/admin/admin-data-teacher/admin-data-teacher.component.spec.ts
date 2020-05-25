import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminDataTeacherComponent } from './admin-data-teacher.component';

describe('AdminDataTeacherComponent', () => {
  let component: AdminDataTeacherComponent;
  let fixture: ComponentFixture<AdminDataTeacherComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminDataTeacherComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminDataTeacherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
