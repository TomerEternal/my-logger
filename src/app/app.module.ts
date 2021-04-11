import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ErrorHandler, isDevMode, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { TakeawayLoggerModule } from 'projects/takeaway-logger/src/public-api';
import { config } from 'rxjs';
import { environment } from 'src/environments/environment';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GlobalErrorHandler } from './handlers/global.error-handler';
import { HttpErrorInterceptor } from './interceptors/http-error.interceptor';
import { ConsoleTakeawayLoggerService } from './services/console-takeaway-logger.service';
import { LocalstorageTakeawayLoggerService } from './services/localstorage-takeaway-logger.service';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    TakeawayLoggerModule.initialize({
      isProduction: true,
      useQueue: true,
      takeawayLoggers: [
        ConsoleTakeawayLoggerService,
        LocalstorageTakeawayLoggerService,
      ],
    }),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorInterceptor,
      multi: true,
    },
    { provide: ErrorHandler, useClass: GlobalErrorHandler },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
