import { Inject, Injectable, Optional } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { buffer, debounceTime, map } from 'rxjs/operators';
import { ITakeawayLogger } from '../IO/ITakeawayLogger';
import { ErrorData } from '../IO/error-data.model';
import { MODULE_CONFIGURATIONS } from '../IO/module-configurations.token';
import { ModuleConfigurations } from '../IO/IModuleConfigurations';
import { TAKEAWAY_LOGGER } from '../IO/takeaway-logger.token';
import { InternalModuleConfigurations } from './configurations/InternalModuleConfigurations';

@Injectable({
  providedIn: 'root',
})
export class TakeawayLoggerService implements ITakeawayLogger {
  errorsSubject = new Subject<string>();

  constructor(
    @Inject(MODULE_CONFIGURATIONS)
    private readonly internalModuleConfigurations: InternalModuleConfigurations,
    @Inject(TAKEAWAY_LOGGER)
    private readonly takeawayLoggers: ITakeawayLogger[]
  ) {
    this.startLogger();
  }

  startLogger() {
    let logger$: Observable<string>;
    if (this.internalModuleConfigurations.useQueue) {
      if (this.internalModuleConfigurations.flushTiming === undefined) {
        throw new Error('please provide a flushing time');
      }
      logger$ = this.errorsSubject.pipe(
        buffer(
          this.errorsSubject.pipe(
            debounceTime(this.internalModuleConfigurations.flushTiming)
          )
        ),
        map((errorMessage) => errorMessage.join('\n\n'))
      );
    } else {
      logger$ = this.errorsSubject;
    }
    logger$.subscribe((errorData) => {
      this.executeErrorWriting(errorData);
    });
  }

  executeErrorWriting(message: string) {
    this.takeawayLoggers.forEach((takeawayLogger) =>
      takeawayLogger.writeError(message)
    );
  }

  writeError(message: string): void {
    if (
      this.internalModuleConfigurations.isProduction &&
      this.takeawayLoggers?.length > 0
    ) {
      this.errorsSubject.next(
        this.internalModuleConfigurations.format({
          message: message,
          stacktrace: new Error().stack,
          timestamp: new Date().toString(),
        })
      );
    }
  }
}
