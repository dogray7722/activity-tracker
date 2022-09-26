import { NgModule } from "@angular/core";
import { MatTabsModule } from "@angular/material/tabs";
import { SharedModule } from "../shared/shared.module";
import { LoginComponent } from "./login.component";

@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [ 
    SharedModule,
    MatTabsModule
   ],
  exports: [
    LoginComponent
  ]
})

export class AuthModule {}