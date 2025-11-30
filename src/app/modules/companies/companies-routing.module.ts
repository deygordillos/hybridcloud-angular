import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompaniesCrudComponent } from './components/companies-crud/companies-crud.component';

const routes: Routes = [
  { path: '', component: CompaniesCrudComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompaniesRoutingModule { }
