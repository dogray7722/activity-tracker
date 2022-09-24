import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from "@angular/forms";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatSelectModule } from "@angular/material/select";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatNativeDateModule } from '@angular/material/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { DatePipe } from '@angular/common';
import { AngularFireModule } from '@angular/fire/compat'
import { environment } from '../environments/environment';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireStorageModule } from '@angular/fire/compat/storage'
import { MatTabsModule } from '@angular/material/tabs';
import { MatStepperModule}  from '@angular/material/stepper';
import { AppComponent } from './app.component';
import { FooterComponent } from './components/footer/footer.component';
import { ActivitiesComponent } from './components/events/activities/activities.component';
import { ActivityComponent } from './components/events/activity/activity.component';
import { CreateActivityComponent } from './components/events/create-activity/create-activity.component';
import { EditActivityComponent } from './components/events/edit-activity/edit-activity.component';
import { DeleteActivityComponent } from './components/events/delete-activity/delete-activity.component';
import { LoginComponent } from './components/auth/login.component';
import { AuthInterceptorService } from './services/auth-interceptor.service';
import { AboutComponent } from './components/about/about.component';
import { HeaderComponent } from './components/header/header.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ActivityDetailComponent } from './components/events/activity-detail/activity-detail.component';
import { ActivitiesModule } from './components/activities/activities.module';
import { SharedModule } from './components/shared/shared.module';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    ActivitiesComponent,
    ActivityComponent,
    CreateActivityComponent,
    EditActivityComponent,
    DeleteActivityComponent,
    LoginComponent,
    AboutComponent,
    HeaderComponent,
    ActivityDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatToolbarModule,
    HttpClientModule,
    FormsModule,
    MatDatepickerModule,
    MatSelectModule,
    MatNativeDateModule,
    MatGridListModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFireStorageModule,
    MatTabsModule,
    FontAwesomeModule,
    MatStepperModule,
    ActivitiesModule,
    SharedModule
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
