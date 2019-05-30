import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { AppRoutingModule } from './app-routing.module';
import { SegurancaModule } from './seguranca/seguranca.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtHttpInterceptor } from './seguranca/JwtHttpInterceptor';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpModule,

    CoreModule,
    SegurancaModule,
    AppRoutingModule
  ],
  providers: [ { provide: HTTP_INTERCEPTORS, useClass: JwtHttpInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
