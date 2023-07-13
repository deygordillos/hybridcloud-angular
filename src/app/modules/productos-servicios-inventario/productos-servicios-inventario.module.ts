import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductosServiciosInventarioRoutingModule } from './productos-servicios-inventario-routing.module';
import { ProductosServiciosInventarioComponent } from './pages/productos-servicios-inventario/productos-servicios-inventario.component';


@NgModule({
  declarations: [
    ProductosServiciosInventarioComponent
  ],
  imports: [
    CommonModule,
    ProductosServiciosInventarioRoutingModule
  ]
})
export class ProductosServiciosInventarioModule { }
