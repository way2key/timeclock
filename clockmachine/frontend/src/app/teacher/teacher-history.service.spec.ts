import { TestBed } from '@angular/core/testing';

import { TeacherHistoryService } from './teacher-history.service';

describe('TeacherHistoryService', () => {
  let service: TeacherHistoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TeacherHistoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
