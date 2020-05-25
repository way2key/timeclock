import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminDataHolidayComponent } from './admin-data-holiday.component';

describe('AdminDataHolidayComponent', () => {
  let component: AdminDataHolidayComponent;
  let fixture: ComponentFixture<AdminDataHolidayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminDataHolidayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminDataHolidayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
