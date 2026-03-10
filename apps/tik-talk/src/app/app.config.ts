import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection,
} from '@angular/core';
import {provideRouter, withComponentInputBinding} from '@angular/router';

import {routes} from './app.routes';
import {provideStore} from '@ngrx/store';
import {provideEffects} from '@ngrx/effects';
import {provideHttpClient, withInterceptors} from '@angular/common/http';
import {authTokenInterceptor} from '@tt/auth';
import {provideToastr} from 'ngx-toastr';
import {provideAnimations} from '@angular/platform-browser/animations';
import {environment} from '../environments/environment';
import { BASE_API_URL } from 'libs/data-access/src/lib/shared/tokens/app.tokens';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({eventCoalescing: true}),
    provideRouter(routes, withComponentInputBinding()),
    { provide: BASE_API_URL, useValue: environment.apiUrl },
    provideHttpClient(withInterceptors([authTokenInterceptor])),
    provideStore(),
    provideEffects(),
    provideAnimations(),
    provideToastr({
      positionClass: 'toast-top-right',
      timeOut: 3000,
      preventDuplicates: true
    }),
  ],
};
