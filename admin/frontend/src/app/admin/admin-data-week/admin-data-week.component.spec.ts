import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminDataWeekComponent } from './admin-data-week.component';

describe('AdminDataWeekComponent', () => {
  let component: AdminDataWeekComponent;
  let fixture: ComponentFixture<AdminDataWeekComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminDataWeekComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminDataWeekComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
