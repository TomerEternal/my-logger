import { TestBed } from '@angular/core/testing';

import { TakeawayLoggerService } from './takeaway-logger.service';

describe('TakeawayLoggerService', () => {
  let service: TakeawayLoggerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TakeawayLoggerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should log errors', () => {
    const mockLog = [];

    service = new TakeawayLoggerService(
      {
        flushTiming: 5000,
        useQueue: false,
        isProduction: false,
        format: (x) => x.message,
      },
      [
        {
          writeError: (message: string) => mockLog.push(message),
        },
      ]
    );

    expect(mockLog.length).toBe(1);
  });
});
