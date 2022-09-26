import { NgModule } from "@angular/core";
import { ActivityTypesComponent } from "./activity-types/activity-types.component";
import { ActivityTypeEditComponent } from "./activity-type-edit/activity-type-edit.component";
import { ActivityTypeCreateComponent } from "./activity-type-create/activity-type-create.component";
import { ActivityTypeDeleteComponent } from "./activity-type-delete/activity-type-delete.component";
import { SharedModule } from "../shared/shared.module";
import { ActivityTypesRoutingModule } from "./activity-types-routing.module";

@NgModule({
  declarations: [
    ActivityTypesComponent,
    ActivityTypeEditComponent,
    ActivityTypeCreateComponent,
    ActivityTypeDeleteComponent
  ],
  imports: [
    SharedModule,
    ActivityTypesRoutingModule
  ],
  exports: [
    ActivityTypesComponent,
    ActivityTypeEditComponent,
    ActivityTypeCreateComponent,
    ActivityTypeDeleteComponent,
  ]
})
export class ActivityTypesModule {}