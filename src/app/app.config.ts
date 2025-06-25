import { ApplicationConfig, importProvidersFrom, LOCALE_ID,provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withInMemoryScrolling } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { provideHighlightOptions } from 'ngx-highlightjs';
import { NgIconsModule } from '@ng-icons/core';
import { featherSearch } from '@ng-icons/feather-icons';

import { BrowserModule } from '@angular/platform-browser';
import { CalendarModule, CalendarMonthViewComponent, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';

import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';

registerLocaleData(localeEs, 'es');

const highlightOptions = {
  coreLibraryLoader: () => import('highlight.js/lib/core'),
  languages: {
    typescript: () => import('highlight.js/lib/languages/typescript'),
    scss: () => import('highlight.js/lib/languages/scss'),
    xml: () => import('highlight.js/lib/languages/xml')
  },
};


export const appConfig: ApplicationConfig = {
  providers: [
   provideRouter(routes),
    { provide: LOCALE_ID, useValue: 'es' },
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes, withInMemoryScrolling({ scrollPositionRestoration: 'top' })), 
    provideAnimationsAsync(),
    importProvidersFrom([SweetAlert2Module.forRoot(), HttpClientModule, NgModule, CalendarMonthViewComponent, FormsModule, ReactiveFormsModule,BrowserModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }), NgIconsModule.withIcons({ featherSearch })]), // ngx-sweetalert2: https://github.com/sweetalert2/ngx-sweetalert2
    provideHighlightOptions(highlightOptions), // ngx-highlightjs: https://github.com/murhafsousli/ngx-highlightjs
  ],
};
