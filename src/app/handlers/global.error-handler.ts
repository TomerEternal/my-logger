import { ErrorHandler, Injectable } from '@angular/core';
import { TakeawayLoggerService } from 'projects/takeaway-logger/src/public-api';
@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
  constructor(private readonly loggerService: TakeawayLoggerService) {}

  handleError(error: Error) {
    if (error instanceof Error) {
      this.loggerService.writeError(
        error.message,
      );
    }
  }
}
