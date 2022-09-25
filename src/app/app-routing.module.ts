import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActivityTypesComponent } from './components/activity-types/activity-types/activity-types.component';
import { CreateActivityComponent } from './components/events/create-activity/create-activity.component';
import { LoginComponent } from './components/auth/login.component';
import { AboutComponent } from './components/about/about.component';
import { AuthGuard } from './components/auth/auth.guard';

const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'about', component: AboutComponent},
  {path: 'types', component: ActivityTypesComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }