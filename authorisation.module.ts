import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthorisationService, AuthorisationInterceptor, AuthorisationGuard } from './authorisation.module';
import { AdalService } from './services/adal-service';

export { AuthorisationService } from './services/authorisation-service';
export { AuthorisationInterceptor } from './interceptors/authorisation-interceptor';
export { AuthorisationGuard } from './guards/authorisation-guard';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
  declarations: [],
  providers: [
    HttpClientModule,
    AuthorisationService,
    AdalService
  ]
})
export class AuthorisationModule { }
