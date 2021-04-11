import { ModuleWithProviders, NgModule, Provider, Type } from '@angular/core';
import {
  ModuleConfigurations,
  OptionalModuleConfigurations,
  RequiredModuleConfigurations,
} from '../IO/IModuleConfigurations';
import { ITakeawayLogger } from '../IO/ITakeawayLogger';
import { MODULE_CONFIGURATIONS } from '../IO/module-configurations.token';
import { TAKEAWAY_LOGGER } from '../IO/takeaway-logger.token';
import { InternalModuleConfigurations } from './configurations/InternalModuleConfigurations';

@NgModule({
  declarations: [],
  imports: [],
  exports: [],
})
export class TakeawayLoggerModule {
  static initialize(
    config: ModuleConfigurations
  ): ModuleWithProviders<TakeawayLoggerModule> {
    //todo move to other file
    const defaultConfigOptions: OptionalModuleConfigurations = {
      flushTiming: 5000,
      useQueue: true,
      formatter: (errorData) =>
        `*** LOGGER START ***\n${errorData.message}\n${errorData.stacktrace}\n${errorData.timestamp}\n*** LOGGER END ***`,
    };
    const loggerProviderClasses = config.takeawayLoggers.map<Provider>(
      (takeAwayLogger) => ({
        provide: TAKEAWAY_LOGGER,
        useClass: takeAwayLogger,
        multi: true,
      })
    );

    return {
      ngModule: TakeawayLoggerModule,
      providers: [
        {
          provide: MODULE_CONFIGURATIONS,
          useValue: {
            isProduction: config.isProduction,
            flushTiming: config.flushTiming ?? defaultConfigOptions.flushTiming,
            useQueue: config.useQueue ?? defaultConfigOptions.useQueue,
            format: config.formatter ?? defaultConfigOptions.formatter,
          } as InternalModuleConfigurations,
        },
        ...loggerProviderClasses,
      ],
    };
  }
}
