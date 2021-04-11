import { Type } from '@angular/core';
import { ErrorData } from './error-data.model';
import { ITakeawayLogger } from './ITakeawayLogger';

export type ModuleConfigurations = RequiredModuleConfigurations &
  OptionalModuleConfigurations;

export type RequiredModuleConfigurations = {
  isProduction: boolean;
  takeawayLoggers: Type<ITakeawayLogger>[];
};

export type OptionalModuleConfigurations = {
  useQueue?: boolean;
  flushTiming?: number;
  formatter?: (errorData: ErrorData) => string;
};
