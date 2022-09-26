import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from "@angular/forms";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatNativeDateModule } from '@angular/material/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { DatePipe } from '@angular/common';
import { SharedModule } from './components/shared/shared.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './components/footer/footer.component';
import { AuthInterceptorService } from './services/auth-interceptor.service';
import { AboutComponent } from './components/about/about.component';
import { HeaderComponent } from './components/header/header.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AuthModule } from './components/auth/auth.module';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    AboutComponent,
    HeaderComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MatToolbarModule,
    HttpClientModule,
    FormsModule,
    SharedModule,
    MatNativeDateModule,
    MatGridListModule,
    FontAwesomeModule,
    AuthModule
  ],
  providers: [ DatePipe, {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptorService,
    multi: true
  } 
],
  exports: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
