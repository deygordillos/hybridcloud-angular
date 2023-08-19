import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductosServiciosInventarioComponent } from './pages/productos-servicios-inventario/productos-servicios-inventario.component';

const routes: Routes = [
  {
    path: '',
    component: ProductosServiciosInventarioComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductosServiciosInventarioRoutingModule {}
