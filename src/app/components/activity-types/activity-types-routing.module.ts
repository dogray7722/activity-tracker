import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "../auth/auth.guard";
import { NgModule } from "@angular/core";
import { ActivityTypesComponent } from "./activity-types/activity-types.component";

const routes: Routes = [
  { path: '', component: ActivityTypesComponent, canActivate: [AuthGuard] }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class ActivityTypesRoutingModule {}