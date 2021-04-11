import { InjectionToken } from "@angular/core";
import { ITakeawayLogger } from "./ITakeawayLogger";

export const TAKEAWAY_LOGGER = new InjectionToken<ITakeawayLogger>('TAKEAWAY_LOGGER');