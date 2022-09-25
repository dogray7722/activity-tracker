import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from "@angular/forms";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatNativeDateModule } from '@angular/material/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { DatePipe } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';
import { EventsModule } from './components/events/events.module';
import { SharedModule } from './components/shared/shared.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './components/footer/footer.component';
import { LoginComponent } from './components/auth/login.component';
import { AuthInterceptorService } from './services/auth-interceptor.service';
import { AboutComponent } from './components/about/about.component';
import { HeaderComponent } from './components/header/header.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ActivitiesModule } from './components/activity-types/activities.module';


@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    LoginComponent,
    AboutComponent,
    HeaderComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatToolbarModule,
    HttpClientModule,
    FormsModule,
    EventsModule,
    SharedModule,
    MatNativeDateModule,
    MatGridListModule,
    MatTabsModule,
    FontAwesomeModule,
    ActivitiesModule,
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
