import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DepositosAlmacenesComponent } from './pages/depositos-almacenes/depositos-almacenes.component';

const routes: Routes = [
  {
    path: '',
    component: DepositosAlmacenesComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DepositosAlmacenesRoutingModule { }
