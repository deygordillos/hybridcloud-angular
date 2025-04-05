import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormasPagoRoutingModule } from './formas-pago-routing.module';
import { FormasPagoComponent } from './pages/formas-pago/formas-pago.component';

@NgModule({
  declarations: [FormasPagoComponent],
  imports: [CommonModule, FormasPagoRoutingModule],
})
export class FormasPagoModule {}
