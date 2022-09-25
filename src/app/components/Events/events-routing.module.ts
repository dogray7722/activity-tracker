import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "../auth/auth.guard";
import { NgModule } from "@angular/core";

import { ActivitiesComponent } from "./activities/activities.component";
import { ActivityDetailComponent } from "./activity-detail/activity-detail.component";
import { CreateActivityComponent } from "./create-activity/create-activity.component";

const routes: Routes = [
  {path: 'events', component: ActivitiesComponent, canActivate: [AuthGuard]},
  {path: 'events/detail', component: ActivityDetailComponent, canActivate: [AuthGuard]},
  {path: 'create', component: CreateActivityComponent, canActivate: [AuthGuard]},
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class EventsRoutingModule {}