import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { BrowserModule } from '@angular/platform-browser';
import { provideHttpClient, withInterceptorsFromDi, HTTP_INTERCEPTORS, withFetch } from '@angular/common/http';
import { provideNoopAnimations } from '@angular/platform-browser/animations';



export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes), 
    importProvidersFrom(BrowserModule),
    provideNoopAnimations(),
    provideHttpClient(withInterceptorsFromDi(), withFetch()),
   
   
  
  ],
};