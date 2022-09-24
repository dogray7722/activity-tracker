import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActivitiesComponent } from './components/events/activities/activities.component';
import { ActivityTypesComponent } from './components/activities/activity-types/activity-types.component';
import { CreateActivityComponent } from './components/events/create-activity/create-activity.component';
import { LoginComponent } from './components/auth/login.component';
import { AboutComponent } from './components/about/about.component';
import { AuthGuard } from './components/auth/auth.guard';
import { ActivityDetailComponent } from './components/events/activity-detail/activity-detail.component';

const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'about', component: AboutComponent},
  {path: 'events', component: ActivitiesComponent, canActivate: [AuthGuard]},
  {path: 'events/detail', component: ActivityDetailComponent, canActivate: [AuthGuard]},
  {path: 'create', component: CreateActivityComponent, canActivate: [AuthGuard]},
  {path: 'types', component: ActivityTypesComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }