import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ImpuestosRoutingModule } from './impuestos-routing.module';
import { ImpuestosComponent } from './pages/impuestos/impuestos.component';
import { PrimeNgModule } from '../prime-ng/prime-ng.module';
import { ReactiveFormsModule } from '@angular/forms';
import { FormCrearEditarComponent } from './components/form-crear-editar/form-crear-editar.component';

@NgModule({
  declarations: [ImpuestosComponent, FormCrearEditarComponent],
  imports: [
    CommonModule,
    ImpuestosRoutingModule,
    PrimeNgModule,
    ReactiveFormsModule,
  ],
})
export class ImpuestosModule {}
