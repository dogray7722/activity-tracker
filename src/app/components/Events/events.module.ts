import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatSelectModule } from "@angular/material/select";
import { MatStepperModule } from "@angular/material/stepper";
import { RouterModule } from "@angular/router";
import { SharedModule } from "../shared/shared.module";
import { ActivitiesComponent } from "./activities/activities.component";
import { ActivityDetailComponent } from "./activity-detail/activity-detail.component";
import { ActivityComponent } from "./activity/activity.component";
import { CreateActivityComponent } from "./create-activity/create-activity.component";
import { DeleteActivityComponent } from "./delete-activity/delete-activity.component";
import { EditActivityComponent } from "./edit-activity/edit-activity.component";
import { EventsRoutingModule } from "./events-routing.module";

@NgModule({
  declarations: [
    ActivitiesComponent,
    ActivityComponent,
    CreateActivityComponent,
    EditActivityComponent,
    DeleteActivityComponent,
    ActivityDetailComponent
  ],
  imports: [
    CommonModule,
    EventsRoutingModule,
    RouterModule,
    SharedModule,
    MatDatepickerModule,
    MatSelectModule,
    MatStepperModule,
  ],
  exports: [
    ActivityComponent,
    EditActivityComponent,
    DeleteActivityComponent,
  ]
})

export class EventsModule {}