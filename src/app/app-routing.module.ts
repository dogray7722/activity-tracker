import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActivitiesComponent } from './components/activities/activities.component';
import { CreateActivityComponent } from './components/create-activity/create-activity.component';

const routes: Routes = [
  {path: '', component: ActivitiesComponent},
  {path: 'create', component: CreateActivityComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
