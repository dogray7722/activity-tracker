import { NgModule } from "@angular/core";
import { ActivityTypesComponent } from "./activity-types/activity-types.component";
import { ActivityTypeEditComponent } from "./activity-type-edit/activity-type-edit.component";
import { ActivityTypeCreateComponent } from "./activity-type-create/activity-type-create.component";
import { ActivityTypeDeleteComponent } from "./activity-type-delete/activity-type-delete.component";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { SharedModule } from "../shared/shared.module";

@NgModule({
  declarations: [
    ActivityTypesComponent,
    ActivityTypeEditComponent,
    ActivityTypeCreateComponent,
    ActivityTypeDeleteComponent
  ],
  imports: [
    CommonModule, 
    RouterModule,
    SharedModule
  ],
  exports: [
    ActivityTypesComponent,
    ActivityTypeEditComponent,
    ActivityTypeCreateComponent,
    ActivityTypeDeleteComponent,
  ]
})
export class ActivitiesModule {}