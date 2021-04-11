import { TestBed } from '@angular/core/testing';

import { ConsoleTakeawayLoggerService } from './console-takeaway-logger.service';

describe('ConsoleTakeawayLoggerService', () => {
  let service: ConsoleTakeawayLoggerService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ConsoleTakeawayLoggerService],
    });
    service = TestBed.inject(ConsoleTakeawayLoggerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
