import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field'
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatDialogModule } from "@angular/material/dialog";
import { MatInputModule } from "@angular/material/input";
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'
import { MatSelectModule } from "@angular/material/select";
import { MatTableModule } from "@angular/material/table";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatNativeDateModule } from '@angular/material/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { DatePipe } from '@angular/common';
import { MatDividerModule } from '@angular/material/divider';
import { AngularFireModule } from '@angular/fire/compat'
import { environment } from '../environments/environment';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireStorageModule } from '@angular/fire/compat/storage'
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTabsModule } from '@angular/material/tabs';
import { AppComponent } from './app.component';
import { FooterComponent } from './components/footer/footer.component';
import { ActivitiesComponent } from './components/Events/activities/activities.component';
import { ActivityComponent } from './components/Events/activity/activity.component';
import { CreateActivityComponent } from './components/Events/create-activity/create-activity.component';
import { EditActivityComponent } from './components/Events/edit-activity/edit-activity.component';
import { DeleteActivityComponent } from './components/Events/delete-activity/delete-activity.component';
import { ActivityTypesComponent } from './components/Types/activity-types/activity-types.component';
import { ActivityTypeEditComponent } from './components/Types/activity-type-edit/activity-type-edit.component';
import { ActivityTypeCreateComponent } from './components/Types/activity-type-create/activity-type-create.component';
import { SnackBarComponent } from './components/snack-bar/snack-bar.component';
import { ActivityTypeDeleteComponent } from './components/Types/activity-type-delete/activity-type-delete.component';
import { LoginComponent } from './components/auth/login.component';
import { AuthInterceptorService } from './services/auth-interceptor.service';
import { AboutComponent } from './components/about/about.component';
import { HeaderComponent } from './components/header/header.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ActivityDetailComponent } from './components/Events/activity-detail/activity-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    ActivitiesComponent,
    ActivityComponent,
    CreateActivityComponent,
    EditActivityComponent,
    DeleteActivityComponent,
    ActivityTypesComponent,
    ActivityTypeEditComponent,
    ActivityTypeCreateComponent,
    SnackBarComponent,
    ActivityTypeDeleteComponent,
    LoginComponent,
    AboutComponent,
    HeaderComponent,
    ActivityDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatToolbarModule,
    HttpClientModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    FormsModule,
    MatDatepickerModule,
    MatDialogModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    MatTableModule,
    MatNativeDateModule,
    DragDropModule,
    MatGridListModule,
    MatDividerModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFireStorageModule,
    MatSnackBarModule,
    MatTabsModule,
    FontAwesomeModule
  ],
  providers: [ DatePipe, {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptorService,
    multi: true
  } 
],
  exports: [MatButtonModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
