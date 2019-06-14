import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AlarmsComponent} from './alarms/alarms.component';

const routes: Routes = [ 
  { path: '', component: AlarmsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
