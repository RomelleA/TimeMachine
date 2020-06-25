import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";

import { HourListComponent } from './hours/hour-list/hour-list.component';
import { HourCreateComponent } from './hours/hour-create/hour-create.component';

const routes: Routes = [
  { path: '', component: HourListComponent },
  { path: 'create', component: HourCreateComponent },
  { path: 'edit/:timeId', component: HourCreateComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [ RouterModule ]
})

export class AppRoutingModule {}
