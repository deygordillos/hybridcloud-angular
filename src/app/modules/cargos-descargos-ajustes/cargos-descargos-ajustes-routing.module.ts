import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CargosDescargosAjustesComponent } from './pages/cargos-descargos-ajustes/cargos-descargos-ajustes.component';

const routes: Routes = [
  {
    path: '',
    component: CargosDescargosAjustesComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CargosDescargosAjustesRoutingModule { }
