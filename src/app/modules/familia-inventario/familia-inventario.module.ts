import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FamiliaInventarioRoutingModule } from './familia-inventario-routing.module';
import { FamiliaInventarioComponent } from './pages/familia-inventario/familia-inventario.component';

@NgModule({
  declarations: [FamiliaInventarioComponent],
  imports: [CommonModule, FamiliaInventarioRoutingModule],
})
export class FamiliaInventarioModule {}
