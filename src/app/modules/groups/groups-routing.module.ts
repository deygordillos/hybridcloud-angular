import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GroupsCrudComponent } from './components/groups-crud/groups-crud.component';

const routes: Routes = [
  { path: '', component: GroupsCrudComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GroupsRoutingModule { }
