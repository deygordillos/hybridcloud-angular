import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MonedasRoutingModule } from './monedas-routing.module';
import { MonedasComponent } from './pages/monedas/monedas.component';

@NgModule({
  declarations: [MonedasComponent],
  imports: [CommonModule, MonedasRoutingModule],
})
export class MonedasModule {}
