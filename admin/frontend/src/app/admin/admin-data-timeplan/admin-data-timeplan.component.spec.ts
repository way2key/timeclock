import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminDataTimeplanComponent } from './admin-data-timeplan.component';

describe('AdminDataTimeplanComponent', () => {
  let component: AdminDataTimeplanComponent;
  let fixture: ComponentFixture<AdminDataTimeplanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminDataTimeplanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminDataTimeplanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
