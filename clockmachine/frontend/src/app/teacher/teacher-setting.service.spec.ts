import { TestBed } from '@angular/core/testing';

import { TeacherSettingService } from './teacher-setting.service';

describe('TeacherSettingService', () => {
  let service: TeacherSettingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TeacherSettingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
