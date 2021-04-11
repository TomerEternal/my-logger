import { Injectable } from '@angular/core';
import { ITakeawayLogger } from 'projects/takeaway-logger/src/public-api';

@Injectable()
export class LocalstorageTakeawayLoggerService implements ITakeawayLogger {
  private readonly localStorageKey = 'LocalstorageTakeawayLoggerService';

  constructor() {}

  writeError(message: string): void {
    const currentLog = localStorage.getItem(this.localStorageKey);
    const currentLogFormatted = currentLog != null ? `\n\n${currentLog}` : '';
    const accumilatedMessage = `${message}${currentLogFormatted}`;
    localStorage.setItem(this.localStorageKey, accumilatedMessage);
  }
}
