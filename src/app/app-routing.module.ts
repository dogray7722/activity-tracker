import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActivitiesComponent } from './components/Events/activities/activities.component';
import { ActivityTypesComponent } from './components/Types/activity-types/activity-types.component';
import { CreateActivityComponent } from './components/Events/create-activity/create-activity.component';
import { LoginComponent } from './components/auth/login.component';
import { AboutComponent } from './components/about/about.component';

const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'events', component: ActivitiesComponent},
  {path: 'create', component: CreateActivityComponent},
  {path: 'types', component: ActivityTypesComponent},
  {path: 'about', component: AboutComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
