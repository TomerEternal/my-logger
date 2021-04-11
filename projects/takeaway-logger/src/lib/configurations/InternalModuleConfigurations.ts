import { ErrorData } from '../../IO/error-data.model';
import { ITakeawayLogger } from '../../IO/ITakeawayLogger';

export type InternalModuleConfigurations = {
  isProduction: boolean;
  useQueue: boolean;
  flushTiming: number;
  format: (errorData: ErrorData) => string;
};
