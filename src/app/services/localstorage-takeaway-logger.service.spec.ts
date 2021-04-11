import { TestBed } from '@angular/core/testing';

import { LocalstorageTakeawayLoggerService } from './localstorage-takeaway-logger.service';

describe('LocalstorageTakeawayLoggerService', () => {
  let service: LocalstorageTakeawayLoggerService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LocalstorageTakeawayLoggerService],
    });
    service = TestBed.inject(LocalstorageTakeawayLoggerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
