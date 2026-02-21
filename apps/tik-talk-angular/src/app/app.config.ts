import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection,
} from '@angular/core';
import {provideRouter} from '@angular/router';

import {routes} from './app.routes';
import {provideStore} from '@ngrx/store';
import {provideEffects} from '@ngrx/effects';
import {provideHttpClient, withInterceptors} from '@angular/common/http';
import {authTokenInterceptor} from '@tt/auth';
import {provideToastr} from 'ngx-toastr';
import {provideAnimations} from '@angular/platform-browser/animations';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({eventCoalescing: true}),
    provideRouter(routes),
    provideHttpClient(withInterceptors([authTokenInterceptor])),
    provideStore(),
    provideEffects(),
    provideAnimations(),
    provideToastr({
      positionClass: 'toast-bottom-center',
      timeOut: 3000,
      preventDuplicates: true
    }),
  ],
};
