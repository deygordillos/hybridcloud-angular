import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CargosDescargosAjustesRoutingModule } from './cargos-descargos-ajustes-routing.module';
import { CargosDescargosAjustesComponent } from './pages/cargos-descargos-ajustes/cargos-descargos-ajustes.component';


@NgModule({
  declarations: [
    CargosDescargosAjustesComponent
  ],
  imports: [
    CommonModule,
    CargosDescargosAjustesRoutingModule
  ]
})
export class CargosDescargosAjustesModule { }
