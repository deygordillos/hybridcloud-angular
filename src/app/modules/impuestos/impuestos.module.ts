import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ImpuestosRoutingModule } from './impuestos-routing.module';
import { ImpuestosComponent } from './pages/impuestos/impuestos.component';
import { PrimeNgModule } from '../prime-ng/prime-ng.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [ImpuestosComponent],
  imports: [
    CommonModule,
    ImpuestosRoutingModule,
    PrimeNgModule,
    ReactiveFormsModule,
  ],
})
export class ImpuestosModule {}
