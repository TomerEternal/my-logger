import { Injectable } from '@angular/core';
import { ITakeawayLogger } from 'projects/takeaway-logger/src/public-api';

@Injectable()
export class ConsoleTakeawayLoggerService implements ITakeawayLogger {
  constructor() {}

  writeError(message: string): void {
    console.log(message);
  }
}
