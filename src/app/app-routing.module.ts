import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActivitiesComponent } from './components/activities/activities.component';
import { ActivityTypesComponent } from './components/activity-types/activity-types.component';
import { CreateActivityComponent } from './components/create-activity/create-activity.component';

const routes: Routes = [
  {path: '', component: ActivitiesComponent},
  {path: 'create', component: CreateActivityComponent},
  {path: 'types', component: ActivityTypesComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
