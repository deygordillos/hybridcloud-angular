import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ImpuestosRoutingModule } from './impuestos-routing.module';
import { ImpuestosComponent } from './pages/impuestos/impuestos.component';

@NgModule({
  declarations: [ImpuestosComponent],
  imports: [CommonModule, ImpuestosRoutingModule],
})
export class ImpuestosModule {}
