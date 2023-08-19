import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DepositosAlmacenesRoutingModule } from './depositos-almacenes-routing.module';
import { DepositosAlmacenesComponent } from './pages/depositos-almacenes/depositos-almacenes.component';

@NgModule({
  declarations: [DepositosAlmacenesComponent],
  imports: [CommonModule, DepositosAlmacenesRoutingModule],
})
export class DepositosAlmacenesModule {}
