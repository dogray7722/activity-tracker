import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/auth/login.component';
import { AboutComponent } from './components/about/about.component';

const routes: Routes = [
  { path: '', component: LoginComponent }, 
  { path: 'events', 
    loadChildren: () => import('./components/events/events.module')
    .then(m => m.EventsModule) },
  { path: 'types',
    loadChildren: () => import('./components/activity-types/activity-types.module')
    .then(m => m.ActivityTypesModule) },
  { path: 'about', component: AboutComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }